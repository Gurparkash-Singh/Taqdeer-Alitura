import { createInvoiceProduct } from "$lib/email_templates/invoice_product"
import { createInvoiceTemplate } from "$lib/email_templates/invoice_template";

export const invoice_creator = {
    create_invoice: (order_items, order, address) => {
        // use user info, address info and order items to generate a commercial invoice
        // send the invoice as a byte64 array to aramex

        let invoice_products = "";

        let total_amount = 0;

        for (let i = 0; i < order_items.length; i++) {
            invoice_products += createInvoiceProduct(
                order_items[i].quantity,
                order_items[i].name,
                order_items[i].hs_code,
                order_items[i].quantity,
                order_items[i].price,
                order_items[i].quantity * order_items[i].price
            )

            total_amount += order_items[i].quantity * order_items[i].price;
        }

        let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

        const invoice = createInvoiceTemplate(
            order.name,
            address,
            order.telephone,
            regionNames.of(order.country),
            order.tracking_id ? order.tracking_id : "",
            invoice_products,
            total_amount,
            new Date().toISOString().split('T')[0]
        )

        return invoice;
    }
}