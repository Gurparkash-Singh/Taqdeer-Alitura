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
                message: "fill in all fields",
                name: name,
                email: email
            });
        }

        if (password !== confirmPassword) {
            return fail(400, {
                invalid: true,
                message: "passwords don't match",
                name: name,
                email: email
            });
        }

        let message = "passwords must have minimum eight characters, ";
        message += "at least one letter and one number";

        if (!/[A-Z]/g.test(password))
        {

            return fail(400, {
                invalid: true,
                message: message,
                name: name,
                email: email
            });
        }

        if (!/[a-z]/g.test(password))
        {
            return fail(400, {
                invalid: true,
                message: message,
                name: name,
                email: email
            });
        }

        if (!/[\d]/g.test(password))
        {
            return fail(400, {
                invalid: true,
                message: message,
                name: name,
                email: email
            });
        }

        if (password.length < 8)
        {
            return fail(400, {
                invalid: true,
                message: message,
                name: name,
                email: email
            });
        }

        let user = await dbFunctions.getUserByEmail(email);

        if (user) {
            return fail(400, {
                invalid: true,
                message: "email taken",
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