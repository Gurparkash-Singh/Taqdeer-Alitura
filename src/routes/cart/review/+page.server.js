import { dbFunctions } from "$lib/db/database";
import { error, redirect } from "@sveltejs/kit";
import { PROD_SK_TAP, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";

export async function load({ cookies, params, url })
{
    const order_id = cookies.get("order_id");

    const infoUpdated = url.searchParams.has("updated");

    if (!order_id) {
        throw redirect(302, "/cart");
    }

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order || order?.status > 5) {
        throw redirect(302, "/cart");
    }

    const [address] = await dbFunctions.getOrderAddress(order.order_address);

    const order_items = await dbFunctions.getOrderItems(order_id);

    return {order, infoUpdated, address, order_items};
}

export const actions = {
    checkout: async ({ cookies, request, locals }) => {
        const data = await request.formData();

        // Get the order details
        // Verify the amount
        // Fill in options accordingly

        const options = {
            method: 'POST',
            url: 'https://api.tap.company/v2/charges/',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${TEST_SK_TAP}`
            },
            data: {
                amount: 324,
                currency: 'SAR',
                customer_initiated: true,
                threeDSecure: true,
                save_card: false,
                receipt: {email: false, sms: false},
                customer: {
                    first_name: 'test',
                    email: 'khalsags.fateh@gmail.com',
                    phone: {
                        country_code: 965,
                        number: 51234567
                    }
                },
                reference: {order: '1'},
                merchant: {id: TAP_MERCHANT_ID},
                source: {id: 'src_all'},
                redirect: {url: 'https://taqdeeralitura.com/cart'}
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