import { dbFunctions } from "$lib/db/database";
import { error, fail, redirect } from "@sveltejs/kit";

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

    if (order.status < 7) {
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

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const order_id = data.get("order-id");

        const [order] = await dbFunctions.getOrderById(order_id);

        if (!order || order.user_id != locals.user.user_id)
        {
            console.log(locals.user);
            return fail(400, {
                invalid: true,
                message: "order not found"
            });
        }

        const session = cookies.get("session");
        let [shopping_session] = await dbFunctions.getShoppingSessionByToken(session);

        if (!session || !shopping_session) {
            await dbFunctions.setCriticalError(
                "shop",
                500,
                `Error creating shopping session` 
            );
            return fail(500, {
                invalid: true,
                message: "server failed"
            });
        }

        shopping_session = shopping_session.id;

        const order_items = await dbFunctions.getOrderItems(order_id);
        error(500);
        return;

        const product_errors = false;

        for (let i = 0; i < order_items.length; i++){
            const item = order_items[i];

            const [product] = await dbFunctions.getProductById(item.product_id);
            const sizes = await dbFunctions.getProductSizes(item.product_id);

            if (!product) {
                product_errors = true;
                break;
            }

            let selected_size;

            for (let i = 0; i < sizes.length; i++)
            {
                if (sizes[i].size_id == item.size_id)
                {
                    selected_size = sizes[i];
                }
            }

            if (!selected_size)
            {
                product_errors = true;
                break;
            }

             if (
                item.quantity < 0  || 
                item.quantity > selected_size.quantity || 
                item.quantity > 5
            )
            {
                product_errors = true;
            }

            throw error(500);

            return;

            const [current_item] = await dbFunctions.checkCartForProduct(
                shopping_session,
                item.product_id,
                item.size_id
            );

            if (!current_item && item.quantity > 0) {
                await dbFunctions.addToCart(
                    shopping_session, 
                    item.product_id, 
                    item.size_id, 
                    item.quantity
                );
                break;
            }

            await dbFunctions.updateCart(
                shopping_session, 
                item.product_id, 
                item.size_id, 
                item.quantity
            );
        }

        if (product_errors) {
            throw redirect(302, "/cart?product_errors=true");
        }

        throw redirect(302, "/cart");
    }
}