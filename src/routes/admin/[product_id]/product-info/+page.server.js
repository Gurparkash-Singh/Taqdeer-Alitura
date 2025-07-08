import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';

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
        const alt_desc = data.get("alt_desc");

        let setLive = false;
        let resetLive = false;
        let setCategory = false;
        let setCollection = false;
        let resetCollection = false;

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

        if (live == "on") {
            if (product.live != 1) {
                const images = await dbFunctions.getImagesByProductId(product_id);

                let message = "to make product live, ";
                message += "you must have at least 1 image, 1 component and 1 size";

                if (!images || images.length === 0) {
                    return fail(400, {
                        invalid: true,
                        message: message
                    });
                }

                const sizes = await dbFunctions.getProductSizes(product_id);

                if (!sizes || sizes.length === 0) {
                    return fail(400, {
                        invalid: true,
                        message: message
                    });
                }

                const components = await dbFunctions.getProductComponents(product_id);

                if (!components || components.length === 0){
                    return fail(400, {
                        invalid: true,
                        message: message
                    });
                }

                setLive = true;
            }
        }
        else {
            if (product.live != 0) {
                resetLive = true;
            }
        }

        if (category) {
            if (category != product.category_id) {
                let [found] = await dbFunctions.getCategoryByID(category);

                if (!found) {
                    return fail(400, {
                        invalid: true,
                        message: "invalid category id"
                    })
                }

                setCategory = true;
            }
        }

        if (collection) {
            if (collection != product.collection_id) {
                let [found] = await dbFunctions.getCollectionByID(collection);

                if (!found) {
                    return fail(400, {
                        invalid: true,
                        message: "invalid collection id"
                    })
                }

                setCollection = true;
            }
        }
        else {
            if (product.collection_id !== null) {
                resetCollection = true;
            }
        }

        if (setLive) {
            await dbFunctions.updateProductLive(product_id, 1);
        }

        if (resetLive) {
            await dbFunctions.updateProductLive(product_id, 0);
        }

        if (setCategory) {
            await dbFunctions.updateProductCategory(
                product_id, 
                category
            );
        }

        if (setCollection) {
            await dbFunctions.updateProductCollection(
                product_id,
                collection
            );
        }

        if (resetCollection) {
            await dbFunctions.updateProductCollection(
                product_id,
                null
            );
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

        if (price) {
            if (price != product.price) {
                await dbFunctions.updateProductPrice(product_id, price);
            }
        }

        if (alt_desc)
        {
            if (product.description != alt_desc) {
                await dbFunctions.updateProductDescription(product_id, alt_desc);
                await dbFunctions.setAltDesc(product_id, alt_desc);
            }
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}