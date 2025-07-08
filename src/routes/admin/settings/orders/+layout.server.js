import { redirect } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent }) => {
    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const { permissions, allowed } = await parent();

    if (!allowed.order) {
        throw redirect(302, '/admin/settings');
    }

    const orderAllowance = {
        users: false,
        orders: false,
        order_items: false
    }

    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].permission_id == 9) {
            orderAllowance.users = true;
        }
        else if(permissions[i].permission_id == 10) {
            orderAllowance.orders = true;
        }
        else if (permissions[i].permission_id == 11)
        {
            orderAllowance.order_items = true;
        }
    }

    return {orderAllowance}
}