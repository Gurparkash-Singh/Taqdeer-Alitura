import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const permissions = await dbFunctions.getAdminPermissions(locals.admin.admin_id);

    let allowed = {
        product: false,
        order: false,
        users: false,
        admin: false
    };

    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].permission_id < 9) {
            allowed.product = true;
        }
        else if(permissions[i].permission_id < 12) {
            allowed.order = true;
        }
        else if (permissions[i].permission_id < 18)
        {
            allowed.users = true;
        }
        else {
            allowed.admin = true;
        }
    }

    return {permissions, allowed};
}