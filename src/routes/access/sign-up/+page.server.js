import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { dbFunctions } from '$lib/db/database.js';

export const actions = {
    register: async ({ cookies, request }) => {
        const data = await request.formData();

        const name = data.get('name').trim();
        const email = data.get('email').trim();
        const password = data.get('password');
        const confirmPassword = data.get('confirm-password');

        if (!name || !email || !password || !confirmPassword) {
            return fail(400, {
                invalid: true,
                message: "Fill all fields",
                name: name,
                email: email
            });
        }

        if (password !== confirmPassword) {
            return fail(400, {
                invalid: true,
                message: "Passwords don't match",
                name: name,
                email: email
            });
        }

        let user = await dbFunctions.getUserByEmail(email);

        if (user) {
            return fail(400, {
                invalid: true,
                message: "Email Taken",
                name: name,
                email: email
            });
        }

        const AuthToken = crypto.randomUUID();

        const encryptedPass = await bcrypt.hash(password, 10);

        [user] = await dbFunctions.createUser(email, encryptedPass, name);


        await dbFunctions.storeAuth(cookies.get("session"), user.user_id);

        throw redirect(303, '/profile');
    }
}