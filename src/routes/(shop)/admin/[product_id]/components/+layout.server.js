import { redirect, error } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';

export const load = async ({ locals, parent, params }) => {
	const id = locals.admin.admin_id;

	const [permission] = await dbFunctions.getAdminPermissionsByName(id, 'components');

	if (!permission) {
		throw redirect(302, './');
	}

	const [property_permission] = await dbFunctions.getAdminPermissionsByParentName(id, 'components');

	return { property_permission };
};
