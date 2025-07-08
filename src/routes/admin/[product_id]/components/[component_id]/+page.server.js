import { dbFunctions } from "$lib/db/database"
import { fail } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
   const properties = await dbFunctions.getPropertiesByComponentId(params.component_id);
   
   return {properties};
}

export const actions = {
    submit: async ({ locals, cookies, request, params }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByPermissionID(
            locals.admin.admin_id,
            7
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

        const property_id = data.get("currentProperty");
        const name = data.get('property_name');
        const value = data.get("property_value");

        const returnMessage = {
            invalid: true,
            name,
            value
        }

        if (!property_id || !name) {
            returnMessage.message = "fill in all fields";
            return fail(400, returnMessage);
        }

        const [property] = await dbFunctions.getPropertyById(property_id);

        if (!property) {
            await dbFunctions.addProperty(params.component_id, name, value);
        }
        else {
            await dbFunctions.updateProperty(property_id, name, value);
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
            7
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

        const property_id = data.get("currentProperty");

        if (!property_id) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [property] = await dbFunctions.getPropertyById(property_id);

        if (!property) {
            return fail(404, {
                invalid: true,
                message: "property not found"
            });
        }

        await dbFunctions.deleteProperty(property_id);

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}