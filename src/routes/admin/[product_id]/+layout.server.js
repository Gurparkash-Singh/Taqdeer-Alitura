import { redirect, error } from "@sveltejs/kit";
import { dbFunctions } from "$lib/db/database";

export const load = async ({ locals, parent, params }) => {
     const [product] = await dbFunctions.getAnyProductById(params.product_id);
    
    if (!product)
    {
        return error(404);
    }

    if (!locals.admin)
    {
        throw redirect(302, '/profile');
    }

    const { permissions, allowed } = await parent();

    if (!allowed.product) {
        throw redirect(302, '/admin/settings');
    }

    const categories = await dbFunctions.getCategories();

    const collections = await dbFunctions.getCollections();

    const productsAllowance = {
       products: false,
       productsWrite: false,
       images: false,
       imagesWrite: false,
       sizes: false,
       sizesWrite: false,
       components: false,
       componentsWrite: false,
       properties: false,
       propertiesWrite: false
    }

    for (let i = 0; i < permissions.length; i++) {
        switch(permissions[i].permission_id) {
            case 3:
                productsAllowance.products = true;
                productsAllowance.productsWrite = permissions[i].allow_write;
                break;
            case 4:
                productsAllowance.images = true;
                productsAllowance.imagesWrite = permissions[i].allow_write;
                break;
            case 5:
                productsAllowance.sizes = true;
                productsAllowance.sizesWrite = permissions[i].allow_write;
                break;
            case 6:
                productsAllowance.components = true;
                productsAllowance.componentsWrite = permissions[i].allow_write;
                break;
            case 7:
                productsAllowance.properties = true;
                productsAllowance.propertiesWrite = permissions[i].allow_write;
                break;
        }
    }

    return {
        product, 
        productsAllowance, 
        product_id: params.product_id,
        categories,
        collections
    }
}