import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export async function load({params})
{
    const [product] = await dbFunctions.getProductById(params.product_id);

    if (!product)
    {
        error(404);
    }

    await dbFunctions.cancelOldOrders();

    const images = await dbFunctions.getImagesByProductId(params.product_id);

    const product_variations = await dbFunctions.getProductVariations(
        params.product_id
    );

    const product_variation_options = await dbFunctions.getProductVariationOptions(
        params.product_id
    );

    const product_items = await dbFunctions.getProductItems(params.product_id);

    const outOfStock = await dbFunctions.getProductOutOfStock(params.product_id);

    const components = await dbFunctions.getProductComponents(params.product_id);

    const properties = await dbFunctions.getComponentProperties(params.product_id);

    const size_chart_components = await dbFunctions.getSizeChartComponents(
        params.product_id
    );

    let size_chart_values = await dbFunctions.getSizeChartValues(params.product_id);

    let temp_values = [[]];
    let current_component;

    if (size_chart_values.length > 0) {
        current_component = size_chart_values[0].size;
    }

    let current_array = 0;

    for (let i = 0; i < size_chart_values.length; i++) {
        if (current_component !== size_chart_values[i].size) {
            current_component = size_chart_values[i].size;
            temp_values.push([]);
            current_array++;
        }
        temp_values[current_array].push(size_chart_values[i]);
    }

    return {
        product,
        images,
        product_variations,
        product_variation_options,
        product_items,
        outOfStock,
        components, 
        properties,
        size_chart_components,
        size_chart_values: temp_values
    };
}

export const actions = {
    add: async ({ cookies, request, params }) => {
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
        const [shopping_session] = await dbFunctions.getShoppingSessionByToken(session);

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

        const quantity = data.get("quantity").trim();
        const item_id = data.get("item");

        if (!quantity || !item_id) {
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

        const [item] = await dbFunctions.getItemById(item_id);

        if (!item) {
            await dbFunctions.setError(
                "shop",
                400,
                `Invalid Product Item` 
            );
            return fail(400, {
                invalid: true,
                message: "item not found"
            });
        }

        if (item.product_id != params.product_id) {
            await dbFunctions.setError(
                "shop",
                400,
                `Product Item does not match expected product` 
            );
            return fail(400, {
                invalid: true,
                message: "product not found"
            });
        }

        const [product] = await dbFunctions.getProductById(params.product_id);

        if (!product) {
             await dbFunctions.setError(
                "shop",
                400,
                `Product not found` 
            );
            return fail(400, {
                invalid: true,
                message: "product not found"
            });
        }

        if (quantity < 0  || quantity > item.quantity || quantity > 5) {
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

        // Check cart for item
        // Then add if not already added, Update if added and remove if quantity = 0

        const [item_in_cart] = await dbFunctions.checkCartForProduct(
            shopping_session.id, 
            item_id
        );

        if (!item_in_cart) {
            if (quantity === 0) {
                return {
                    success: true,
                    message: "nothing to add"
                };
            }

            await dbFunctions.addToCart(shopping_session.id, item_id, quantity);
            return {
                success: true,
                message: "added to cart"
            }
        }

        if (quantity === 0) {
            await dbFunctions.removeFromCart(shopping_session.id, item_id);
            return {
                success: true,
                message: "removed from cart"
            };
        }

        await dbFunctions.updateCart(shopping_session.id, item_id, quantity);

        return {
            success: true,
            message: "updated cart"
        };
    }
};