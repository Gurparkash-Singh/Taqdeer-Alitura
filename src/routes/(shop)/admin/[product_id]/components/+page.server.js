import { dbFunctions } from "$lib/db/database"
import { fail } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
   const components = await dbFunctions.getProductComponents(params.product_id);

   return {components};
}

export const actions = {
    submit: async ({ locals, cookies, request, params }) => {
        const data = await request.formData();

        const [permissions] = await dbFunctions.getAdminPermissionsByName(
            locals.admin.admin_id,
            'components'
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

        const component_id = data.get("currentComponent");
        const component_name = data.get('component_name');
        const description = data.get("desc");

        const returnMessage = {
            invalid: true,
            description
        }

        if (!component_id || !component_name) {
            returnMessage.message = "fill in all fields";
            return fail(400, returnMessage);
        }

        const [components] = await dbFunctions.getComponentById(component_id);

        if (!components) {
            await dbFunctions.addComponent(params.product_id, component_name, description);
        }
        else {
            await dbFunctions.updateComponent(component_id, component_name, description);
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
            'components'
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

        const component_id = data.get("currentComponent");

        if (!component_id) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            });
        }

        const [component] = await dbFunctions.getComponentById(component_id);

        if (!component) {
            return fail(404, {
                invalid: true,
                message: "component not found"
            });
        }

        const properties = await dbFunctions.getComponentProperties(component_id);

        if (properties && properties.length !== 0){
            return fail(400, {
                invalid: true,
                message: "Component has properties associated with it"
            });
        }

        await dbFunctions.deleteComponent(component_id);

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}