import { fail, redirect } from '@sveltejs/kit';
import { profileEditor } from "$lib/functions/profile-editor.js";

export const actions = {
    register: async ({ cookies, request }) => {
        const data = await request.formData();

        const emptyFields = profileEditor.emptyFields(data);

        const name = data.get('name').trim();
        const email = data.get('email').trim();
        const password = data.get('password');
        const confirmPassword = data.get('confirm-password');

        if (emptyFields)
        {
            return fail(400, {
                invalid: true,
                message: "fill in all fields",
                name: name,
                email: email
            });
        }

        if (!profileEditor.passwordsMatch(confirmPassword, password)) {
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
            return fail(400, {
                invalid: true,
                message: message,
                name: name,
                email: email
            });
        }

        const invalidEmail = await profileEditor.invalidEmail(email);

        if (invalidEmail) {
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