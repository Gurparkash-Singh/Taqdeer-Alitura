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

    return {product, images, sizes};
}

export const actions = {
    add: async ({ cookies, request }) => {
        const data = await request.formData();

        const session = cookies.get("session");
        let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

        if (!session || shopping_session.length === 0) {
            return fail(500, {
                invalid: true,
                message: "Server failed"
            });
        }

        shopping_session = shopping_session[0].id

        const product_id = data.get("product").trim();
        const size = data.get("size").trim();
        const quantity = data.get("quantity").trim();

        if (!product_id || !size || !quantity) {
            return fail(400, {
                invalid: true,
                message: "Missing fields"
            });
        }

        const product = await dbFunctions.getProductById(product_id);

        if (product.length == 0)
        {
            return fail(404, {
                invalid: true,
                message: "Invalid Product ID"
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
            return fail(404, {
                invalid: true,
                message: "Size not found"
            });
        }

        if (quantity < 0  || quantity > selected_size.quantity || quantity > 5)
        {
            return fail(404, {
                invalid: true,
                message: "Invalid quantity"
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
                    message: "Nothing to add"
                };
            }
            await dbFunctions.addToCart(shopping_session, product_id, size, quantity);
            return {
                success: true,
                message: "Added to Cart!"
            };
        }

        if (quantity == 0) {
            await dbFunctions.removeFromCart(shopping_session, product_id, size);
            return {
                success: true,
                message: "Removed Item from Cart!"
            };
        }

        await dbFunctions.updateCart(shopping_session, product_id, size, quantity);
        return {
            success: true,
            message: "Updated Cart!"
        };
    }
};