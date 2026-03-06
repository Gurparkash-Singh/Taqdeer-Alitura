import { redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';
import { aramex } from '$lib/functions/aramex';

export const load = async ({ locals }) => {
	const orders = await dbFunctions.getAllOrdersAndPaymentDetails(locals.user.user_id);

	if (orders.length == 0) {
		return {};
	}

    const track_orders = [];

    orders.forEach(order => {
        if (order.status === "processing" || order.status === "shipped") {
            track_orders.push(order.tracking_id);
        }
    });

    const result = await aramex.trackShipment(track_orders);

    result.TrackingResults.forEach(async (order) => {
        if (order.Value.UpdateDescription === "Delivered") {
            await dbFunctions.setOrderToDelivered(order.Key);
        }

        if (order.Value.UpdateDescription === "Collected") {
            await dbFunctions.setOrderToShipping(order.Key);
        }
    })

	return { orders };
};
