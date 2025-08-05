import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const [permission] = await dbFunctions.getAdminPermissionsByName(
        locals.admin.admin_id,
        "product types"
    );

    if (!permission) {
        throw redirect(302, '/admin/settings/products');
    }

    const product_types = await dbFunctions.getProductTypes();

    return {product_types};
}