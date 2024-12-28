import { dbFunctions } from "$lib/db/database";
import { error } from "@sveltejs/kit";

export async function load({params})
{
    const product = await dbFunctions.getProductById(params.product_id);

    if (product.length == 0)
    {
        error(404);
    }

    const images = await dbFunctions.getImagesByProductId(params.product_id);

    const sizes = await dbFunctions.getProductSizes(params.product_id);

    return {product, images, sizes};
}