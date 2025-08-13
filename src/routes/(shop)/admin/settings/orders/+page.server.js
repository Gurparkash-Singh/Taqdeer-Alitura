import { redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';

export const load = async ({ locals }) => {
	const orders = await dbFunctions.getAllOrdersAndPaymentDetails(locals.user.user_id);

	if (orders.length == 0) {
		return {};
	}

	return { orders };
};
