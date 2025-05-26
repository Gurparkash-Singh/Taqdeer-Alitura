import { dbFunctions } from "$lib/db/database";

export async function load({ locals }) {
    const orders = await dbFunctions.getUserOrders(locals.user.user_id);

    if (orders.length == 0) {
        return {};
    }

    return {orders};
}