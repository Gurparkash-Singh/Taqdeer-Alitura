import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const product_id = data.get("product_id");
        const sku = data.get("sku");
        const name = data.get("name");
        const category = data.get("category_id");
        const collection = data.get("collection_id");
        const price = data.get("price");
        const live = data.get("live");

        if (!product_id) {
            return fail(404, {
                invalid: true,
                message: "fill in product_id field"
            });
        }

        const [product] = await dbFunctions.getAnyProductById(product_id);

        if (!product) {
            return fail(404, {
                invalid: true,
                message: "product not found"
            });
        }

        if (name)
        {
            if (product.name != name) {
                await dbFunctions.updateProductName(product_id, name);
            }
        }

        if (sku) {
            if (sku != product.sku) {
                await dbFunctions.updateProductSKU(product_id, sku);
            }
        }

        if (category) {
            if (category != product.category_id) {
                await dbFunctions.updateProductCategory(
                    product_id, 
                    category
                );
            }
        }

        if (collection) {
            if (collection != product.collection_id) {
                await dbFunctions.updateProductCollection(
                    product_id,
                    collection
                );
            }
        }

        if (price) {
            if (price != product.price) {
                await dbFunctions.updateProductPrice(product_id, price);
            }
        }

       if (live == "on") {
            if (product.live != 1) {
                await dbFunctions.updateProductLive(product_id, 1);
            }
        }
        else {
            if (product.live != 0) {
                await dbFunctions.updateProductLive(product_id, 0);
            }
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}