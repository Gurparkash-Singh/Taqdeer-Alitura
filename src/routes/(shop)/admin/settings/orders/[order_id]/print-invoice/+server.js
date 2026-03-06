import { dbFunctions } from "$lib/db/database";
import { invoice_creator } from "$lib/functions/create-order-invoice";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies, params }) {
    const order_id = params.order_id;

    if (!order_id) {
        error(404);
    }

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order) {
        error(404);
    }

    const [address] = await dbFunctions.getOrderAddress(order.order_address);

    const order_items = await dbFunctions.getOrderItems(order_id);

    const order_invoice_items = await dbFunctions.getOrderInvoiceWithoutDelivery(order_id);
    const [delivery] = await dbFunctions.getOrderDelivery(order_id);

    let one_line_address = address.address_line1 + ', ';
    one_line_address += address.city + ', ';
    one_line_address += address.province + ', ';
    one_line_address += address.postal_code + ', ';
    one_line_address += address.country + ' ';

    const invoice = invoice_creator.create_invoice(
        order_items,
        order,
        one_line_address
    );

    return json({invoice}, { status: 200 });
}