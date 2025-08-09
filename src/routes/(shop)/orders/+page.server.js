import { dbFunctions } from "$lib/db/database";
import { error, fail, redirect } from "@sveltejs/kit";
import { MODE, PROD_SK_TAP, RESEND_API_KEY, RESEND_EMAIL, TAP_MERCHANT_ID, TEST_SK_TAP } from "$env/static/private";
import axios from "axios";
import { aramex } from "$lib/functions/aramex";
import { getCountryCallingCode } from "libphonenumber-js";
import { createReceiptProduct } from "$lib/email_templates/receipt_product";
import { createReceipt } from "$lib/email_templates/receipt";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export async function load({ cookies, params, url }) {
    const tap_id = url.searchParams.get("tap_id");

    if (!tap_id) {
        error(404);
    }

    let auth_token = PROD_SK_TAP;

    if (MODE == "DEVELOPMENT") {
        auth_token = TEST_SK_TAP
    }

    const options = {
        method: 'GET',
        url: `https://api.tap.company/v2/charges/${tap_id}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${auth_token}`
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
                sameSite: 'lax',
                maxAge: 60 * 60 * 24,
                secure: true
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

    let [order] = await dbFunctions.getOrderById(order_id);

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

    let order_invoice_items;
    let delivery;

    if (!order.tracking_id) {
        let preloader = "";
        let receipt_products = "";
        let email;
        let num_items = 0;
        let customs_value = 0;
        let weight = 0;

        for (let i = 0; i < order_items.length; i++) {
            num_items += order_items[i].quantity;
            customs_value += order_items[i].quantity * order_items[i].price;
            weight += order_items[i].weight;

            const snippet = createReceiptProduct(
                order_items[i].name,
                order_items[i].alt_desc,
                order_items[i].large_image,
                order_items[i].quantity,
                order_items[i].variations.Size
            )

            preloader += snippet.preloader;
            receipt_products += snippet.product;
        }

        weight = weight / 1000;

        let one_line_address = address.address_line1 + ", ";
        one_line_address += address.city + ", ";
        one_line_address += address.province + ", ";
        one_line_address += address.postal_code + ", ";
        one_line_address += address.country + " ";
        
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
            const errors = aramexResult;
            await dbFunctions.setCriticalError(
                "orders",
                500,
                `${JSON.stringify(errors, null, 2)}}`
            );

            error(500);
        }

        await dbFunctions.addAramexShipmentId(order_id, aramexResult.Shipments[0].ID);
        [order] = await dbFunctions.getOrderById(order_id);

        email = createReceipt(
            preloader,
            order.tracking_id,
            `https://www.aramex.com/us/en/track/results?source=aramex&ShipmentNumber=${order.tracking_id}`,
            order.name,
            one_line_address,
            receipt_products,
            order.tap_receipt,
            new Date().toISOString().split("T")[0]
        )

        order_invoice_items = await dbFunctions.getOrderInvoiceWithoutDelivery(order_id);
        [delivery] = await dbFunctions.getOrderDelivery(order_id);

        const { returnData, email_error } = await resend.emails.send({
            from: RESEND_EMAIL,
            to: [order.user_email],
            bcc: ['sandee.ceo@gmail.com'],
            subject: "Taqdeer Alitura Receipt",
            html: email
        });

         if (email_error)
        {
            await dbFunctions.setCriticalError(
                "order receipt error", 
                500,
                `email not sent to ${order.user_email}\nError: ${email_error.name}` 
            );
            if (email_error.name == 'validation_error')
            {
                return {
                    order,
                    address,
                    order_items,
                    order_invoice_items,
                    delivery,
                    error: "invalid email please contact support"
                };
            }
            return {
                order,
                address,
                order_items,
                order_invoice_items,
                delivery,
                error: "error sending email, order has been created"
            };
        }
    }

    order_invoice_items = await dbFunctions.getOrderInvoiceWithoutDelivery(order_id);
    [delivery] = await dbFunctions.getOrderDelivery(order_id);

    return {
        order,
        address,
        order_items,
        order_invoice_items,
        delivery
    };
}