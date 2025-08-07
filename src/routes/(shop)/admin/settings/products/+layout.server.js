import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const id = locals.admin.admin_id;

    const [permission] = await dbFunctions.getAdminPermissionsByName(id, "products");

    if (!permission) {
        throw redirect(302, '/admin/settings');
    }

    const permissions = await dbFunctions.getAdminPermissionsByParentName(id, "products");

    const productsAllowance = {
        size_components: false,
        product_variations: false,
        update_products: false,
        collections: false,
        categories: false,
        discounts: false
    }

    for (let i = 0; i < permissions.length; i++) {
        switch (permissions[i].name) {
            case "update products":
                productsAllowance.update_products = true;
                break;
            case "collections":
                productsAllowance.collections = true;
                break;
            case "categories":
                productsAllowance.categories = true;
                break;
            case "discounts":
                productsAllowance.discounts = true;
                break;
            case "size components":
                productsAllowance.size_components = true;
                break;
            case "product variations":
                productsAllowance.product_variations = true;
                break;
        }
    }

    return {productsAllowance}
}