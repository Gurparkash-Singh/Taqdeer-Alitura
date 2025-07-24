import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByPermissionID(
            locals.admin.admin_id,
            1
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

        const collection_id = data.get("currentCollection");
        const collection_name = data.get('collection_name');
        const live = data.get("live");

        if (!collection_id || !collection_name) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [collection] = await dbFunctions.getCollectionByID(collection_id);

        if (!collection) {
            await dbFunctions.addCollection(collection_name);
        }
        else {
            await dbFunctions.updateCollection(collection_id, collection_name, live);
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
            1
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

        const collection_id = data.get("currentCollection");

        if (!collection_id) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [collection] = await dbFunctions.getCollectionByID(collection_id);

        if (!collection) {
            return fail(404, {
                invalid: true,
                message: "collection not found"
            });
        }

        const products = await dbFunctions.getProductsByCollection(collection_id);

        if (products.length > 0) {
            let message = "collection has products associated with it\n";
            message += "delete products or move them to another collection before";
            message += " deleting the collection";

            return fail(400, {
                invalid: true,
                message
            });
        }

        await dbFunctions.deleteCollection(collection_id);

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}