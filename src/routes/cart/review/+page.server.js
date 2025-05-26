import { dbFunctions } from "$lib/db/database";
import { error, fail, redirect } from "@sveltejs/kit";
import { PROD_SK_TAP, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";
import { getCountryCallingCode } from "libphonenumber-js";

export async function load({ cookies, params, url }) {
    const order_id = cookies.get("order_id");

    const infoUpdated = url.searchParams.has("updated");

    const declined = url.searchParams.has("declined");

    if (!order_id) {
        throw redirect(302, "/cart");
    }

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order || order?.status > 5) {
        throw redirect(302, "/cart");
    }

    const [address] = await dbFunctions.getOrderAddress(order.order_address);

    const order_items = await dbFunctions.getOrderItems(order_id);

    const order_invoice_items = await dbFunctions.getOrderInvoiceWithoutDelivery(order_id);
    const [delivery] = await dbFunctions.getOrderDelivery(order_id);

    return {
        order,
        infoUpdated,
        declined,
        address,
        order_items,
        order_invoice_items,
        delivery
    };
}

export const actions = {
    checkout: async ({ cookies, request, locals }) => {
        const data = await request.formData();

        const currency_code = data.get("currency");

        const order_id = cookies.get("order_id");

        const [order_total] = await dbFunctions.getOrderInvoiceTotal(order_id);

        const [order] = await dbFunctions.getOrderById(order_id);

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
                error(500);
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

        if (!available) {
            return fail(404, {
                message: "invalid currency code"
            });
        }

        const options = {
            method: 'POST',
            url: 'https://api.tap.company/v2/charges/',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${TEST_SK_TAP}`
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
                redirect: { url: 'https://taqdeeralitura.com/orders' }
            }
        };

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
            error(500);
        }

        if (url) {
            throw redirect(302, url);
        }
        else {
            error(500);
        }
    }
}