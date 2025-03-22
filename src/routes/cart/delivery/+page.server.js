import { dbFunctions } from "$lib/db/database";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, params, url, cookies }) {
    if (!cookies.get("order_id")) {
        return redirect(302, "/cart/info");
    }

    const [order] = await dbFunctions.getCreatedOrderById(
        cookies.get("order_id")
    );

    if (!order) {
        return redirect(302, "/cart/info");
    }

    const infoUpdated = url.searchParams.has("updateInfo");

    if (infoUpdated) {
        return {
            infoUpdated: true
        }
    }
}