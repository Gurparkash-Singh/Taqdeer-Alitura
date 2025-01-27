import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { dbFunctions } from '$lib/db/database.js';

export const actions = {
    login: async ({cookies, request}) => {
        const data = await request.formData();

        const email = data.get('email').trim();
        const password = data.get('password');

        if (!email || !password)
        {
            return fail(400, {
                invalid: true,
                message: "Fill all fields",
                email
            });
        }

        const user = await dbFunctions.getUserByEmail(email);

        if (!user)
        {
            return fail(400, {
                invalid: true, 
                message: "Email or Password Invalid",
                email
            });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) 
        {
            return fail(400, {
                invalid: true, 
                message: "Email or Password Invalid",
                email
            });
        }

        await dbFunctions.storeAuth(cookies.get("session"), user.user_id);

        throw redirect(303, '/profile');
    }
}