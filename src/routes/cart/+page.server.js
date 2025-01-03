import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";

export async function load({ cookies })
{
    const session = cookies.get("session");
    let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

    if (!session || shopping_session.length === 0) {
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
            return fail(500, {
                invalid: true,
                message: "Server failed"
            });
        }

        shopping_session = shopping_session[0].id

        const product_id = data.get("product_id").trim();
        const size_id = data.get("size_id").trim();

        if (!product_id || !size_id)
        {
            return fail(400, {
                invalid: true,
                message: "Missing fields"
            });
        }

        await dbFunctions.removeFromCart(shopping_session, product_id, size_id);
        return {
            success: true,
            message: "Removed Item from Cart!"
        };
    }
};