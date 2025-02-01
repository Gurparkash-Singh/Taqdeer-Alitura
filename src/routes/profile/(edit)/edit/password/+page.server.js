import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import bcrypt from "bcryptjs";

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const oldPassword = data.get("old-password");
        const password = data.get('password');
        let confirmPassword = data.get('confirm-password');

        const user = await dbFunctions.getUserByEmail(locals.user.email);

        if (!oldPassword || !password || !confirmPassword) {
            return fail(400, {
                invalid: true, 
                message: "fill in all fields",
            });
        }

        if (password != confirmPassword) {
            return fail(400, {
                invalid: true, 
                message: "passwords don't match",
            });
        }

        let message = "passwords must have minimum eight characters, ";
        message += "at least one letter and one number";

        if (!/[A-Z]/g.test(password))
        {

            return fail(400, {
                invalid: true,
                message: message
            });
        }

        if (!/[a-z]/g.test(password))
        {
            return fail(400, {
                invalid: true,
                message: message
            });
        }

        if (!/[\d]/g.test(password))
        {
            return fail(400, {
                invalid: true,
                message: message
            });
        }

        if (password.length < 8)
        {
            return fail(400, {
                invalid: true,
                message: message
            });
        }

        const verifyPassword = await bcrypt.compare(oldPassword, user.password);
        
        if (!verifyPassword) 
        {
            return fail(400, {
                invalid: true, 
                message: "password invalid"
            });
        }

        const encryptedPass = await bcrypt.hash(password, 10);

        await dbFunctions.updatePassword(encryptedPass, locals.user.email);

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}