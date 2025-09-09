import { dbFunctions } from '$lib/db/database';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
    const [permission] = await dbFunctions.getAdminPermissionsByName(
        locals.admin.admin_id,
        'sizing info'
    );

    if (!permission) {
        throw redirect(302, './');
    }
};