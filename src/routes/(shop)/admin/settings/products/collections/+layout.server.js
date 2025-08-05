import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const [permission] = await dbFunctions.getAdminPermissionsByName(
        locals.admin.admin_id,
        "collections"
    );

    if (!permission) {
        throw redirect(302, '/admin/settings/products');
    }

    const collections = await dbFunctions.getCollections();

    return {collections};
}