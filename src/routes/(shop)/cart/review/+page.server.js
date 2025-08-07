import { dbFunctions } from "$lib/db/database";
import { error, fail, redirect } from "@sveltejs/kit";
import { MODE, PROD_SK_TAP, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";
import { getCountryCallingCode } from "libphonenumber-js";
import { profileEditor } from "$lib/functions/profile-editor";

export async function load({ cookies, url, locals }) {
    const order_id = cookies.get("order_id");

    const infoUpdated = url.searchParams.has("updated");

    const declined = url.searchParams.has("declined");

    if (!order_id) {
        throw redirect(302, "/cart");
    }

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order || order?.status >= 6) {
        throw redirect(302, "/cart");
    }

    const [address] = await dbFunctions.getOrderAddress(order.order_address);

    const order_items = await dbFunctions.getOrderItems(order_id);

    const order_invoice_items = await dbFunctions.getOrderInvoiceWithoutDelivery(order_id);
    const [delivery] = await dbFunctions.getOrderDelivery(order_id);

    let cards;

    if (locals.user) {
        cards = await dbFunctions.getUserCards(locals.user.user_id);
    }

    return {
        order,
        infoUpdated,
        declined,
        address,
        order_items,
        order_invoice_items,
        delivery,
        cards
    };
}

export const actions = {
    checkout: async ({ cookies, request, locals }) => {
        const data = await request.formData();

        const currency_code = data.get("currency");
        const save_card = data.get("save_card");
        let card = data.get("card");

        const order_id = cookies.get("order_id");

        const [order_total] = await dbFunctions.getOrderInvoiceTotal(order_id);

        const [order] = await dbFunctions.getOrderById(order_id);

        let user_tap_id;
        let user;

        if (order.user_id) {
            [user] = await dbFunctions.getUserByID(order.user_id);

            if (!user) {
                return fail(404, {
                    invalid: true,
                    message: "user not found"
                });
            }

            if (user.tap_customer_id) {
                user_tap_id = user.tap_customer_id;
            }
            else {
                const customer_id = await profileEditor.createUserInTap(
                    user.name, 
                    user.email
                );
                await dbFunctions.saveTapCustomer(customer_id, user.user_id);

                user = await dbFunctions.getUserByID(order.user_id);

                user_tap_id = user.tap_customer_id;
            }
        }

        let currency_response;

        try {
            currency_response = await axios.get(
                "https://latest.currency-api.pages.dev/v1/currencies/sar.json"
            );
        } catch (axiosError) {
            if (MODE === "DEVELOPMENT") {
                currency_response = {
                    data: {
                        sar: {
                            "aed": 0.97933333,
                            "bhd": 0.10026667,
                            "egp": 13.51472091,
                            "eur": 0.24612223,
                            "gbp": 0.20652019,
                            "kwd": 0.082188105,
                            "omr": 0.10265457,
                            "qar": 0.97066667,
                            "sar": 1,
                            "usd": 0.26666667
                        }
                    }
                }
                console.log("Using development values for currency rates");
                console.log("File: /+layout.server.js");
            }
            else {
                await dbFunctions.setCriticalError(
                    "checkout",
                    500,
                    JSON.stringify(axiosError.response.data)
                )
                return fail(500, {
                    invalid: true,
                    message: "something went wrong"
                });
            }
        }

        let available_currencies = await dbFunctions.getAvailableCurrencies();

        let available = false;

        let conversion_rate = 1;

        for (let i = 0; i < available_currencies.length; i++) {
            if (currency_code == available_currencies[i].currency_code) {
                available = true;
                conversion_rate = currency_response.data.sar;
                conversion_rate = conversion_rate[currency_code.toLowerCase()];
            }
        }

        if (!order) {
            return fail(404, {
                message: "order not found"
            });
        }

        await dbFunctions.setOrderToPending(order_id);

        if (!available) {
            return fail(404, {
                message: "invalid currency code"
            });
        }

        let redirect_url = "https://taqdeeralitura.com/orders";
        let auth_token = PROD_SK_TAP;

        if (MODE == "DEVELOPMENT") {
            redirect_url = "http://localhost:5173/orders";
            auth_token = TEST_SK_TAP;
        }

        const options = {
            method: 'POST',
            url: 'https://api.tap.company/v2/charges/',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${auth_token}`
            },
            data: {
                amount: order_total.total * conversion_rate,
                currency: currency_code,
                customer_initiated: true,
                threeDSecure: true,
                save_card: false,
                receipt: { email: false, sms: false },
                customer: {
                    first_name: order.name,
                    email: order.user_email,
                    phone: {
                        country_code: getCountryCallingCode(order.country),
                        number: order.telephone
                    }
                },
                reference: { order: order_id },
                merchant: { id: TAP_MERCHANT_ID },
                source: { id: 'src_all' },
                redirect: { url: redirect_url }
            }
        };

        if (user_tap_id) {
            options.data.customer = {
                phone: {
                    country_code: getCountryCallingCode(order.country),
                    number: order.telephone
                },
                id: user_tap_id
            }
        }
        else if (save_card && !user) {
            return fail(404, {
                invalid: true,
                message: "user not found"
            })
        }
        else if (save_card && !user.tap_customer_id) {
            return fail(500, {
                invalid: true,
                message: "something went wrong"
            })
        }

        if (card) {
            // Tokenize saved card and use it
            if (!locals.user) {
                return fail(404, {
                    invalid: true,
                    message: "user not found"
                });
            }

            [card] = await dbFunctions.getCardById(card);

            if (!card || card.user_id != locals.user.user_id) {
                return fail(404, {
                    invalid: true,
                    message: "card not found"
                });
            }
        }

        if (save_card) {
            options.data.save_card = true;
        }

        let url;

        try {
            const data = await axios.request(options);

            url = data.data.transaction.url;
        } catch (axiosError) {
            await dbFunctions.setCriticalError(
                "checkout",
                500,
                JSON.stringify(axiosError.response.data)
            )
            return fail(500, {
                invalid: true,
                message: "something went wrong"
            });
        }

        if (url) {
            throw redirect(302, url);
        }
        else {
            return fail(500, {
                invalid: true,
                message: "something went wrong"
            });
        }
    },

    cancel: async ({ cookies, request, locals }) => {
        const order_id = cookies.get("order_id");

        const [order] = await dbFunctions.getOrderById(order_id);
        await dbFunctions.cancelOrder(order_id);
    }
}