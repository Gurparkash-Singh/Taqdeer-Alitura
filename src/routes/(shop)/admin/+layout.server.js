import { redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';

export const load = async ({ locals }) => {
	if (!locals.admin) {
		throw redirect(302, '/profile');
	}

	const id = locals.admin.admin_id;

	let allowed = {
		product: false,
		order: false,
		users: false,
		admin: false
	};

	let [permission] = await dbFunctions.getAdminPermissionsByName(id, 'products');

	if (permission) {
		allowed.product = true;
	}

	[permission] = await dbFunctions.getAdminPermissionsByName(id, 'orders');

	if (permission) {
		allowed.order = true;
	}

	[permission] = await dbFunctions.getAdminPermissionsByName(id, 'users');

	if (permission) {
		allowed.users = true;
	}
	[permission] = await dbFunctions.getAdminPermissionsByName(id, 'admins');

	if (permission) {
		allowed.admin = true;
	}

	return { allowed };
};
