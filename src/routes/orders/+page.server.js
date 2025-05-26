import { dbFunctions } from "$lib/db/database";
import { error, fail, redirect } from "@sveltejs/kit";
import { PROD_SK_TAP, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";

export async function load({ cookies, params, url }) {
    const tap_id = url.searchParams.get("tap_id");

    if (!tap_id) {
        error(404);
    }

    const options = {
        method: 'GET',
        url: `https://api.tap.company/v2/charges/${tap_id}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${TEST_SK_TAP}`
        }
    };

    let payment_status;
    let tap_order_id;
    let order_id;
    let card_object;
    let save_card;
    let receipt;

    try {
        const data = await axios.request(options);
        payment_status = data.data?.status;
        tap_order_id = data.data?.order?.id;
        order_id = data.data?.reference?.order;
        card_object = data.data?.card;
        save_card = data.data?.save_card;
        receipt = data.data?.receipt?.id;
    } catch (axiosError) {
        await dbFunctions.setCriticalError(
            "orders",
            500,
            JSON.stringify(axiosError, null, 2)
        )
        console.log(axiosError);
        error(500);
    }

    if (payment_status != "CAPTURED") {
        if (!cookies.get("order_id")) {
            cookies.set('order_id', order_id, {
                path: "/",
                sameSite: 'strict',
                maxAge: 60 * 60 * 24
            });
        }
        throw redirect(302, "/cart/review?declined=true");
    }

    // if save_card then save card_object

    await dbFunctions.saveTapDetails(order_id, tap_id, tap_order_id, receipt);

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order) {
        error(500);
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