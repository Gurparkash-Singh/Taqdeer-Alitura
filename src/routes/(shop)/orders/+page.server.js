import { dbFunctions } from "$lib/db/database";
import { error, fail, redirect } from "@sveltejs/kit";
import { PROD_SK_TAP, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";
import { aramex } from "$lib/functions/aramex";
import { getCountryCallingCode } from "libphonenumber-js";

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
    let amount;
    let provider;

    try {
        const data = await axios.request(options);
        payment_status = data.data?.status;
        tap_order_id = data.data?.order?.id;
        order_id = data.data?.reference?.order;
        card_object = data.data?.card;
        save_card = data.data?.save_card;
        receipt = data.data?.receipt?.id;
        amount = data.data?.amount;
        provider = data.data?.source.payment_method;
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

    const paymentInsertResult = await dbFunctions.addPaymentDetails(
        amount,
        provider,
        payment_status
    );

    await dbFunctions.saveTapDetails(
        order_id, 
        tap_id, 
        tap_order_id, 
        receipt,
        paymentInsertResult.insertId
    );

    const [order] = await dbFunctions.getOrderById(order_id);

    if (!order) {
        dbFunctions.setCriticalError(
            "orders",
            500,
            `order not found for order: ${order_id}`
        );
        error(500);
    }

    const [address] = await dbFunctions.getOrderAddress(order.order_address);

    if (!address) {
        dbFunctions.setCriticalError(
            "orders",
            500,
            `address not found for order: ${order_id}`
        );
        error(500);
    }

    const order_items = await dbFunctions.getOrderItems(order_id);

    let num_items = 0;
    let customs_value = 0;
    let weight = 0;

    for (let i = 0; i < order_items.length; i++) {
        num_items += order_items[i].quantity;
        customs_value += order_items[i].quantity * order_items[i].price;
        weight += order_items[i].weight;
    }

    weight = weight / 1000;

    if (!order.tracking_id) {
        const aramexResult = await aramex.createShipment(
            address.address_line1,
            address.address_line2,
            address.city,
            address.province,
            address.postal_code,
            address.country,
            order.name,
            getCountryCallingCode(order.country),
            order.telephone,
            order.user_email,
            num_items,
            customs_value,
            weight
        )

        if (aramexResult.HasErrors) {
            const errors = aramexResult.Notifications;
            await dbFunctions.setError(
                "orders",
                500,
                `${JSON.stringify(errors, null, 2)}}`
            );
            error(500);
        }

        console.log(JSON.stringify(aramexResult, null, 2));
        console.log(aramexResult.Shipments[0].ID);

        await dbFunctions.addAramexShipmentId(order_id, aramexResult.Shipments[0].ID);
    }

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