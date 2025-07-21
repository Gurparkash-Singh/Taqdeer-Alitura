import { dbFunctions } from "$lib/db/database";
import { error, redirect } from "@sveltejs/kit";
import axios from "axios";

export async function load({ cookies, url })
{
    const session = cookies.get("session");
    let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

    let order_id = cookies.get("order_id");

    if (order_id) {
        const [order] = await dbFunctions.getOrderById(order_id);

        if (order?.status <= 5) {
            throw redirect(302, "/cart/review");
        }
    }

    if (!session || shopping_session.length === 0) {
        await dbFunctions.setCriticalError(
            "cart", 
            400,
            `shopping session was not created successfully` 
        );
        error(500);
    }

    let product_errors = false;

    if (url.searchParams.has("product_errors")) {
        product_errors = true;
    }

    shopping_session = shopping_session[0].id;
    
    const cart_items = await dbFunctions.getItemsForCurrentSession(shopping_session);

    return {cart_items, product_errors};
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

        const item_id = data.get("item_id").trim();

        if (!item_id)
        {
            await dbFunctions.setError(
                "cart", 
                400,
                `missing item id` 
            );
            return fail(400, {
                invalid: true,
                message: "missing fields"
            });
        }
        await dbFunctions.removeFromCart(shopping_session, item_id);

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
    }
};