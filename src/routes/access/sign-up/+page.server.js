import { fail, redirect } from '@sveltejs/kit';
import { profileEditor } from "$lib/functions/profile-editor.js";
import { dbFunctions } from '$lib/db/database';

export const actions = {
    register: async ({ cookies, request }) => {
        const data = await request.formData();

        const name = data.get('name').trim();
        const email = data.get('email').trim();
        const password = data.get('password');
        const confirmPassword = data.get('confirm-password');

        if (!name || !email || !password || !confirmPassword)
        {
            await dbFunctions.setError(
                "signup", 
                400,
                `${email} left a field empty` 
            );
            return fail(400, {
                invalid: true,
                message: "fill in all fields",
                name: name,
                email: email
            });
        }

        if (!profileEditor.passwordsMatch(confirmPassword, password)) {
            await dbFunctions.setError(
                "signup", 
                400,
                `${email} passwords don't match` 
            );
            return fail(400, {
                invalid: true,
                message: "passwords don't match",
                name: name,
                email: email
            });
        }

        let message = "passwords must have minimum eight characters, ";
        message += "at least one letter and one number";

        if (!profileEditor.validNewPassword(password)) {
            await dbFunctions.setError(
                "signup", 
                400,
                `${email} typed an invalid password` 
            );
            return fail(400, {
                invalid: true,
                message: message,
                name: name,
                email: email
            });
        }

        const invalidEmail = await profileEditor.invalidEmail(email);

        if (invalidEmail) {
            await dbFunctions.setError(
                "signup", 
                400,
                `${email} is invalid\nError: ${invalidEmail}` 
            );
            return fail(400, {
                invalid: true,
                message: invalidEmail,
                name: name,
                email: ""
            });
        }

        let session = cookies.get("session");

        await profileEditor.createUser(email, password, name, session);

        throw redirect(303, '/profile');
    }
}