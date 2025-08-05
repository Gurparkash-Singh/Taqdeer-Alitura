import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const id = locals.admin.admin_id;

    const [permission] = await dbFunctions.getAdminPermissionsByName(id, "orders");

    if (!permission) {
        throw redirect(302, '/admin/settings');
    }

    const permissions = await dbFunctions.getAdminPermissionsByParentName(id, "orders");

    const orderAllowance = {
        all_orders: false,
        create_pickups: false
    }

    for (let i = 0; i < permissions.length; i++) {
        switch (permissions[i].name) {
            case "all orders":
                orderAllowance.all_orders = true;
                break;
            case "create pickups":
                orderAllowance.create_pickups = true;
                break;
        }
    }

    return {orderAllowance}
}