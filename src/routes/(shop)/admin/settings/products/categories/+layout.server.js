import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const [permission] = await dbFunctions.getAdminPermissionsByName(
        locals.admin.admin_id,
        "categories"
    );

    if (!permission) {
        throw redirect(302, '/admin/settings/products');
    }
    
    const categories = await dbFunctions.getCategories();

    return {categories};
}