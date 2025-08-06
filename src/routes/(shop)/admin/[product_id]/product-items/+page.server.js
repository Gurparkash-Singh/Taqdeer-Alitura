import { dbFunctions } from "$lib/db/database";

export async function load({params}){
    const product_items = await dbFunctions.getProductItems(params.product_id);

    const product_variations = await dbFunctions.getProductVariations(
        params.product_id
    );

    const product_variation_options = await dbFunctions.getProductVariationOptions(
        params.product_id
    );

    return {
        product_variations,
        product_variation_options,
        product_items
    }
}