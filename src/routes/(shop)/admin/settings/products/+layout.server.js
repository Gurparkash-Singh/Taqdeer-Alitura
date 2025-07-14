import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const { permissions, allowed } = await parent();

    if (!allowed.product) {
        throw redirect(302, '/admin/settings');
    }

    const productsAllowance = {
        categories: false,
        collections: false,
        products: false,
        discounts: false
    }

    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].permission_id == 1) {
            productsAllowance.collections = true;
        }
        else if(permissions[i].permission_id == 2) {
            productsAllowance.categories = true;
        }
        else if (permissions[i].permission_id < 8)
        {
            productsAllowance.products = true;
        }
        else if (permissions[i].permission_id == 8){
            productsAllowance.discounts = true;
        }
    }

    return {productsAllowance}
}