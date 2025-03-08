import { dbFunctions } from "$lib/db/database";
import { error, redirect } from "@sveltejs/kit";
import { TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";

export async function load({ cookies })
{
    const session = cookies.get("session");
    let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

    if (!session || shopping_session.length === 0) {
        await dbFunctions.setCriticalError(
            "cart", 
            400,
            `shopping session was not created successfully` 
        );
        error(500);
    }

    shopping_session = shopping_session[0].id

    const cart_items = await dbFunctions.getItemsForCurrentSession(shopping_session);

    return {cart_items};
}

export const actions = {
    remove: async ({ cookies, request }) => {
        const data = await request.formData();

        const session = cookies.get("session");
        let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

        if (!session || shopping_session.length === 0) {
            await dbFunctions.setCriticalError(
                "cart", 
                400,
                `shopping session was not created successfully` 
            );
            return fail(500, {
                invalid: true,
                message: "server failed"
            });
        }

        shopping_session = shopping_session[0].id

        const product_id = data.get("product_id").trim();
        const size_id = data.get("size_id").trim();

        if (!product_id || !size_id)
        {
            await dbFunctions.setError(
                "cart", 
                400,
                `product id or size id was not passed in` 
            );
            return fail(400, {
                invalid: true,
                message: "missing fields"
            });
        }

        await dbFunctions.removeFromCart(shopping_session, product_id, size_id);
        return {
            success: true,
            message: "removed item from cart"
        };
    },

    clear: async ({cookies, request, locals}) => {
        const data = await request.formData();

        const session = cookies.get("session");
        let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

        if (!session || shopping_session.length === 0) {
            await dbFunctions.setCriticalError(
                "cart", 
                400,
                `shopping session was not created successfully` 
            );
            return fail(500, {
                invalid: true,
                message: "server failed"
            });
        }

        shopping_session = shopping_session[0].id

        await dbFunctions.removeAllFromCart(shopping_session);

        return {
            success: true,
            message: "cleared cart"
        };
    },

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
};