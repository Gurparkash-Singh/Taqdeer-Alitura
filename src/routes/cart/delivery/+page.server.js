import { dbFunctions } from "$lib/db/database";
import { redirect } from "@sveltejs/kit";
import { PROD_SK_TAP, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";

export async function load({ locals, params, url, cookies }) {
    if (!cookies.get("order_id")) {
        return redirect(302, "/cart/info");
    }

    const [order] = await dbFunctions.getCreatedOrderById(
        cookies.get("order_id")
    );

    if (!order) {
        return redirect(302, "/cart/info");
    }

    const infoUpdated = url.searchParams.has("updateInfo");

    if (infoUpdated) {
        return {
            infoUpdated: true
        }
    }
}

export const actions = {
    checkout: async ({ cookies, request, locals }) => {
        const data = await request.formData();

        const session = cookies.get("session");
        let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

        if (!session || shopping_session.length === 0) {
            await dbFunctions.setCriticalError(
                "cart", 
                500,
                `shopping session was not created successfully` 
            );
            error(500);
        }

        if(!locals.admin) {
            await dbFunctions.setError(
                "cart", 
                400,
                `${session} tried to checkout`
            );
            error(400);
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
                amount: 100,
                currency: 'SAR',
                customer_initiated: true,
                threeDSecure: true,
                save_card: false,
                receipt: {email: false, sms: false},
                customer: {
                    first_name: 'test', 
                    email: 'khalsags.fateh@gmail.com'
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