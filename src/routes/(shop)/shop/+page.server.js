import { dbFunctions } from "$lib/db/database";

export async function load({locals})
{
    const categories = await dbFunctions.getCategories();

    const collections = await dbFunctions.getCollections();

    const products = await dbFunctions.getProducts();

    const images = await dbFunctions.getMainImages();

    categories.unshift({ category_id: 0, category_name: 'All' });

    collections.unshift({ collection_id: 0, collection_name: 'All' });

    return {categories, products, collections, images};
}