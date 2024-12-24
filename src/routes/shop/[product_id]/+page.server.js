import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";

export async function load({params})
{
    const product = await dbFunctions.getProductById(params.product_id);

    if (product.length == 0)
    {
        error(404);
    }

    return {product};
}