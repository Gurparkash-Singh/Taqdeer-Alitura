import { dbFunctions } from '$lib/db/database';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const size_chart_components = await dbFunctions.getSizeChartComponents(params.product_id);

	let all_components = await dbFunctions.getUnusedSizeChartComponents(params.product_id);

	return {
		size_chart_components,
		all_components
	};
};

export const actions = {
	submit: async ({ locals, cookies, request, params }) => {
		const data = await request.formData();

        let add_list = data.get("add-list");
        let remove_list = data.get("remove-list");

        add_list = JSON.parse(add_list);
        remove_list = JSON.parse(remove_list);

        const [permission] = await dbFunctions.getAdminPermissionsByName(
			locals.admin.admin_id,
			'sizing info'
		);

		if (!permission) {
			return fail(404, {
				invalid: true,
				message: 'invalid permissions'
			});
		}

		if (permission.allow_write != 1) {
			return fail(404, {
				invalid: true,
				message: 'invalid permissions'
			});
		}

        for (let i = 0; i < add_list.length; i++) {
            await dbFunctions.addSizeChartComponentToProduct(
                add_list[i].component_id,
                params.product_id
            );
        }

        for (let i = 0; i < remove_list.length; i++) {
            await dbFunctions.removeSizeChartComponentFromProduct(
                remove_list[i].component_id,
                params.product_id
            );
        }

		return {
			success: true,
			message: 'values updated successfully'
		};
	}
};
