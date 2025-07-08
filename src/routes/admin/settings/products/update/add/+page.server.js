import { dbFunctions } from "$lib/db/database";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals, parent, params }) => {
    const { permissions, allowed } = await parent();

    if (!allowed.product) {
        throw redirect(302, '/admin/settings');
    }

    const categories = await dbFunctions.getCategories();

    const collections = await dbFunctions.getCollections();

    const productsAllowance = [];

    for (let i = 0; i < permissions.length; i++) {
        switch(permissions[i].permission_id) {
            case 3:
                productsAllowance.push(1);
                if (permissions[i].allow_write === 1){
                    productsAllowance.push(1);
                }
                break;
            case 4:
                productsAllowance.push(1);
                if (permissions[i].allow_write === 1){
                    productsAllowance.push(1);
                }
                break;
            case 5:
                productsAllowance.push(1);
                if (permissions[i].allow_write === 1){
                    productsAllowance.push(1);
                }
                break;
            case 6:
                productsAllowance.push(1);
                if (permissions[i].allow_write === 1){
                    productsAllowance.push(1);
                }
                break;
            case 7:
                productsAllowance.push(1);
                if (permissions[i].allow_write === 1){
                    productsAllowance.push(1);
                }
                break;
        }
    }

    if (productsAllowance.length !== 10) {
        throw redirect(302, '/admin/settings');
    }

    return {
        productsAllowance,
        categories,
        collections
    }
}

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const sku = data.get("sku");
        const name = data.get("name");
        const category = data.get("category_id");
        const collection = data.get("collection_id");
        const price = data.get("price");
        const alt_desc = data.get("alt_desc");

        if (!name || !sku || !price || !alt_desc || !category) {
            return fail(400, {
                invalid: true,
                message: "Fill in all required fields"
            });
        }
        
        let [found] = await dbFunctions.getCategoryByID(category);

        if (!found) {
            return fail(400, {
                invalid: true,
                message: "Invalid category id"
            });
        }

        if (collection) {
            [found] = await dbFunctions.getCollectionByID(collection);

            if (!found) {
                return fail(400, {
                    invalid: true,
                    message: "Invalid collection id"
                });
            }

            await dbFunctions.createProduct(name, sku, category, collection, price, alt_desc);
        }
        else {
            await dbFunctions.createProduct(name, sku, category, null, price, alt_desc);
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}