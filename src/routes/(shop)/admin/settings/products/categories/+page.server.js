import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByName(
            locals.admin.admin_id,
            "categories"
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

        const category_id = data.get("currentCategory");
        const category_name = data.get('category_name');

        if (!category_id || !category_name) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [category] = await dbFunctions.getCategoryByID(category_id);

        if (!category) {
            await dbFunctions.addCategory(category_name);
        }
        else {
            await dbFunctions.updateCategory(category_id, category_name);
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    },

    delete: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByName(
            locals.admin.admin_id,
            "categories"
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

        const category_id = data.get("currentCategory");

        if (!category_id) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [category] = await dbFunctions.getCategoryByID(category_id);

        if (!category) {
            return fail(404, {
                invalid: true,
                message: "category not found"
            });
        }

        const products = await dbFunctions.getProductsByCategory(category_id);

        if (products.length > 0) {
            let message = "category has products associated with it\n";
            message += "delete products or move them to another category before";
            message += " deleting the category";

            return fail(400, {
                invalid: true,
                message
            });
        }

        await dbFunctions.deleteCategory(category_id);

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}