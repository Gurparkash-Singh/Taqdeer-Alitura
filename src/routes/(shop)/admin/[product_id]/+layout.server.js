import { redirect, error } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent, params }) => {
    const [product] = await dbFunctions.getAnyProductById(params.product_id);
    
    if (!product)
    {
        return error(404);
    }

    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const id = locals.admin.admin_id;

    const [permission] = await dbFunctions.getAdminPermissionsByName(id, "update products");

    if (!permission) {
        throw redirect(302, '/admin/settings/products');
    }

    const permissions = await dbFunctions.getAdminPermissionsByParentName(
        id, 
        "update products"
    );

    const categories = await dbFunctions.getCategories();

    const collections = await dbFunctions.getCollections();

    let productsAllowance = {
       product_info: false,
       images: false,
       product_items: false,
       components: false,
       sizing_info: false
    }

    for (let i = 0; i < permissions.length; i++) {
        switch (permissions[i].name) {
            case "product info":
                productsAllowance.product_info = true;
                break;
            case "images":
                productsAllowance.images = true;
                break;
            case "product items":
                productsAllowance.product_items = true;
                break;
            case "components":
                productsAllowance.components = true;
                break;
            case "sizing info":
                productsAllowance.sizing_info = true;
                break;
        }
    }

    return {
        product, 
        productsAllowance, 
        product_id: params.product_id,
        categories,
        collections
    }
}