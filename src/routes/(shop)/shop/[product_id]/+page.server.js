import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export async function load({params})
{
    const product = await dbFunctions.getProductById(params.product_id);

    if (product.length == 0)
    {
        error(404);
    }

    const images = await dbFunctions.getImagesByProductId(params.product_id);

    const sizes = await dbFunctions.getProductSizes(params.product_id);

    const components = await dbFunctions.getProductComponents(params.product_id);

    const properties = await dbFunctions.getComponentProperties(params.product_id);

    return {product, images, sizes, components, properties};
}

export const actions = {
    add: async ({ cookies, request }) => {
        const data = await request.formData();

        const order_id = cookies.get("order_id");

        if (order_id) {
            const [order] = await dbFunctions.getOrderById(order_id);
    
            if (order?.status < 6) {
                return fail(500, {
                    invalid: true,
                    message: "cannot update order"
                });
            }
        }

        const session = cookies.get("session");
        let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

        if (!session || shopping_session.length === 0) {
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

        shopping_session = shopping_session[0].id

        const product_id = data.get("product").trim();
        const size = data.get("size").trim();
        const quantity = data.get("quantity").trim();

        if (!product_id || !size || !quantity) {
            await dbFunctions.setError(
                "shop",
                400,
                `Empty fields` 
            );
            return fail(400, {
                invalid: true,
                message: "missing fields"
            });
        }

        const product = await dbFunctions.getProductById(product_id);

        if (product.length == 0)
        {
            await dbFunctions.setError(
                "shop",
                404,
                `Invalid product id` 
            );
            return fail(404, {
                invalid: true,
                message: "invalid product id"
            });
        }

        if (product[0].live != 1) {
            await dbFunctions.setError(
                "shop",
                404,
                `Tried adding a product that wasn't live` 
            );
            return fail(404, {
                invalid: true,
                message: "product is not live"
            });
        }

        const sizes = await dbFunctions.getProductSizes(product_id);

        let selected_size;

        for (let i = 0; i < sizes.length; i++)
        {
            if (sizes[i].size_id == size)
            {
                selected_size = sizes[i];
            }
        }

        if (!selected_size)
        {
            await dbFunctions.setError(
                "shop",
                404,
                `Size not found` 
            );
            return fail(404, {
                invalid: true,
                message: "size not found"
            });
        }

        if (quantity < 0  || quantity > selected_size.quantity || quantity > 5)
        {
            await dbFunctions.setError(
                "shop",
                400,
                `Invalid quantity` 
            );
            return fail(404, {
                invalid: true,
                message: "invalid quantity"
            });
        }

        const current_item = await dbFunctions.checkCartForProduct(
            shopping_session,
            product_id,
            size
        );

        if (current_item.length === 0)
        {
            if (quantity == 0)
            {
                return {
                    success: true,
                    message: "nothing to add"
                };
            }
            await dbFunctions.addToCart(shopping_session, product_id, size, quantity);
            return {
                success: true,
                message: "added to cart"
            };
        }

        if (quantity == 0) {
            await dbFunctions.removeFromCart(shopping_session, product_id, size);
            return {
                success: true,
                message: "removed item from cart"
            };
        }

        await dbFunctions.updateCart(shopping_session, product_id, size, quantity);
        return {
            success: true,
            message: "updated cart"
        };
    }
};