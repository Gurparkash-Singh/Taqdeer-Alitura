import { dbFunctions } from "$lib/db/database"
import { fail } from "@sveltejs/kit";
import * as fs from "fs";

export const load = async ({ locals, params }) => {
    const images = await dbFunctions.getImagesByProductId(params.product_id);

    return {images};
}

export const actions = {
    submit: async ({locals, request, params}) => {
        const data = await request.formData();
        const images = data.get("images");

        const [image] = await dbFunctions.getImage(images);

        if (!image) {
            return fail(404, {
                invalid: true,
                message: "image not found"
            });
        }

        if (image.product_id != params.product_id) {
            return fail(404, {
                invalid: true,
                message: "product not found"
            });
        }

        await dbFunctions.setMainImage(params.product_id, images);

        return {
            success: true, 
            message:"main image changed successfully"
        }
    }
}