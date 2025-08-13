import { dbFunctions } from '$lib/db/database';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, parent, params }) => {
	const [permission] = await dbFunctions.getAdminPermissionsByName(
		locals.admin.admin_id,
		'update products'
	);

	if (!permission) {
		throw redirect(302, '/admin/settings/products');
	}

	if (permission.allow_write != 1) {
		throw redirect(302, '/admin/settings/products');
	}

	const categories = await dbFunctions.getCategories();

	const collections = await dbFunctions.getCollections();

	return {
		categories,
		collections
	};
};

export const actions = {
	submit: async ({ locals, cookies, request }) => {
		const data = await request.formData();

		const name = data.get('name');
		const category = data.get('category_id');
		const collection = data.get('collection_id');
		const price = data.get('price');
		const alt_desc = data.get('alt_desc');
		const description = data.get('description');

		const [permission] = await dbFunctions.getAdminPermissionsByName(
			locals.admin.admin_id,
			'update products'
		);

		if (!permission) {
			return fail(400, {
				invalid: true,
				message: 'Invalid Permission'
			});
		}

		if (permission.allow_write != 1) {
			return fail(400, {
				invalid: true,
				message: 'Invalid Permission'
			});
		}

		if (!name || !price || !alt_desc || !category || !description) {
			return fail(400, {
				invalid: true,
				message: 'Fill in all required fields'
			});
		}

		let [found] = await dbFunctions.getCategoryByID(category);

		if (!found) {
			return fail(400, {
				invalid: true,
				message: 'Invalid category id'
			});
		}

		let result;

		if (collection) {
			[found] = await dbFunctions.getCollectionByID(collection);

			if (!found) {
				return fail(400, {
					invalid: true,
					message: 'Invalid collection id'
				});
			}

			result = await dbFunctions.createProduct(
				name,
				category,
				collection,
				price,
				alt_desc,
				description
			);
		} else {
			result = await dbFunctions.createProduct(name, category, null, price, alt_desc, description);
		}

		return {
			success: true,
			message: 'values updated successfully'
		};
	}
};
