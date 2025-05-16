import { dbFunctions } from "$lib/db/database";
import { error, redirect } from "@sveltejs/kit";

export async function load({ cookies })
{
    const order_id = cookies.get("order_id");

    if (!order_id) {
        throw redirect(302, "/cart");
    }

    const [order] = await dbFunctions.getOrderById(order_id);

    if (order?.status > 5) {
        throw redirect(302, "/cart");
    }

    return {order};
}