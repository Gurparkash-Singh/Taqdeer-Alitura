import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";

export async function load({ cookies })
{
    const session = cookies.get("session");

    let messages = cookies.get("messages");

    let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

    if (!session || shopping_session.length === 0) {
        error(500);
    }

    if (messages) {
        cookies.set('messages', '', {
            path: '/',
            expires: new Date(0)
        });
    }
    else {
        messages = []
    }

    shopping_session = shopping_session[0].id;

    let num_items = 0;

    const cart_items = await dbFunctions.getItemsForCurrentSession(shopping_session);

    for (let i = 0; i < cart_items.length; i++)
    {
        num_items += cart_items[i].quantity;
    }

    return {num_items, messages};
}