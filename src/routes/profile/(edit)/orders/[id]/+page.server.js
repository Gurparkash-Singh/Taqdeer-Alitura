import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";

export async function load({ locals, params }) {
    const order_id = params.id;

    if (!order_id) {
        error(404);
    }

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order) {
        error(404);
    }

    if (order.user_id != locals.user.user_id)
    {
        error(404);
    }

    if (order.status < 6) {
        error(404);
    }

    const [address] = await dbFunctions.getOrderAddress(order.order_address);

    const order_items = await dbFunctions.getOrderItems(order_id);

    const order_invoice_items = await dbFunctions.getOrderInvoiceWithoutDelivery(order_id);
    const [delivery] = await dbFunctions.getOrderDelivery(order_id);

    return {
        order,
        address,
        order_items,
        order_invoice_items,
        delivery
    };
}