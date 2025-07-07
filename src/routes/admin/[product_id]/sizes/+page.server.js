import { dbFunctions } from "$lib/db/database"
import { fail } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
   const sizes = await dbFunctions.getProductSizes(params.product_id);

   return {sizes};
}

export const actions = {
    submit: async ({ locals, cookies, request, params }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByPermissionID(
            locals.admin.admin_id,
            5
        );

        if (!permissions) {
            return fail(400, {
                invalid: true,
                message: "Invalid permissions"
            });
        }

        if (!permissions.allow_write == 1) {
            return fail(400, {
                invalid: true,
                message: "Invalid permissions"
            });
        }

        const size_id = data.get("currentSize");
        const size_name = data.get('size_name');
        const size_abbr = data.get("size_abbr");
        const quantity = data.get("quantity");

        const returnMessage = {
            invalid: true,
            size_id,
            size_name,
            size_abbr,
            quantity
        }


        if (!size_id || !size_name) {
            returnMessage.message = "fill in all fields";
            return fail(400, returnMessage);
        }

        if (quantity < 0) {
            returnMessage.message = "quantity must be greater than or equal to 0"
            return fail(400, returnMessage);
        }

        const [size] = await dbFunctions.getSizeById(size_id);

        if (!size) {
            await dbFunctions.addProductSize(
                params.product_id, 
                size_name, 
                size_abbr, 
                quantity
            );
        }
        else {
            await dbFunctions.updateProductSize(
                size_id, 
                size_name, 
                size_abbr, 
                quantity
            );
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    },

    delete: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByPermissionID(
            locals.admin.admin_id,
            5
        );

        if (!permissions) {
            return fail(400, {
                invalid: true,
                message: "Invalid permissions"
            });
        }

        if (!permissions.allow_write == 1) {
            return fail(400, {
                invalid: true,
                message: "Invalid permissions"
            });
        }

        const size_id = data.get("currentSize");

        if (!size_id) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [size] = await dbFunctions.getSizeById(size_id);

        if (!size) {
            return fail(404, {
                invalid: true,
                message: "size not found"
            });
        }

        const result = await dbFunctions.deleteSize(size_id);

        if (!result) {
            return fail(400, {
                invalid: true,
                message: "Cannot delete value, reference error"
            })
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}