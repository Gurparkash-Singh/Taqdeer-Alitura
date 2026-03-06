import { redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';
import { aramex } from '$lib/functions/aramex';

export const load = async ({ locals }) => {
	let orders = await dbFunctions.getAllOrdersAndPaymentDetails();

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

    for (let i = 0; i < result.TrackingResults.length; i++){
        let order = result.TrackingResults[i];

        if (order.Value[0].UpdateDescription === "Delivered") {
            await dbFunctions.setOrderToDelivered(order.Key);
        }
        else if (order.Value[0].UpdateDescription === "Received at Origin Facility") {
            await dbFunctions.setOrderToShipping(order.Key);
        }
    }

    orders = await dbFunctions.getAllOrdersAndPaymentDetails();

	return { orders };
};
