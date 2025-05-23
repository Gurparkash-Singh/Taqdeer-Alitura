import { dbFunctions } from "$lib/db/database"
import { fail } from "@sveltejs/kit";
import * as fs from "fs";

export const load = async ({ locals, params }) => {
    const images = await dbFunctions.getImagesByProductId(params.product_id);

    return {images};
}

export const actions = {
    delete: async ({locals, request, params}) => {
        const data = await request.formData();

        const images = data.get("images");
        const multiple = data.get("multiple-selected");

        if (multiple) {
            let toDelete = [];
            for (let i = 0; i < images.length; i++) {
                const [image] = await dbFunctions.getImage(images[i]);

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

                toDelete.push(image);
            }

            try {
                toDelete.forEach(async (img) => {
                    fs.unlinkSync(`static/products/${img.image_link}`);
                    await dbFunctions.deleteImage(img.image_id);
                });
            } catch (error) {
                dbFunctions.setCriticalError(
                    "delete images", 
                    500, 
                    JSON.stringify(error)
                );
                return fail(500, {
                    invalid: true,
                    message: "something went wrong"
                })
            }

            return {
                success: true, 
                message:"images deleted successfully"
            }
        }
        else {
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

            try {
                fs.unlinkSync(`static/products/${image.image_link}`);
                await dbFunctions.deleteImage(image.image_id);
            } catch (error) {
                console.error(error);
                dbFunctions.setCriticalError(
                    "delete images", 
                    500, 
                    JSON.stringify(error)
                );
                return fail(500, {
                    invalid: true,
                    message: "something went wrong"
                })
            }

            return {
                success: true, 
                message:"image deleted successfully"
            }
        }
    },

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