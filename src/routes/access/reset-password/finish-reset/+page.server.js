import { fail, error, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';

export async function load({ params, url }) {
    const email = url.searchParams.get('email');
    const token = url.searchParams.get('token');
    const submit = url.search;

    if (submit == "?/submit")
    {
        return;
    }

    if (!token)
    {
        return error(404, {
            invalid: true,
            message: "token not found or token expired"
        })
    }

    const user = await dbFunctions.getUserByAuthToken(token);

    if (!user) {
        return error(404, {
            invalid: true,
            message: "token not found or token expired"
        })
    }

    return {token};
}

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const token = data.get("token");
        const password = data.get('password');
        let confirmPassword = data.get('confirm-password');

        const emptyFields = profileEditor.emptyFields([
            token,
            password,
            confirmPassword
        ]);

        if (emptyFields) {
            return fail(400, {
                invalid: true, 
                message: "fill in all fields",
                token
            });
        }

        let [user] = await dbFunctions.getUserByAuthToken(token);
        const token_id = user.id;
        [user] = await dbFunctions.getUserByID(user.user_id);

        if (!user) {
            return fail(400, {
                invalid: true, 
                message: "token expired",
                token
            });
        }

        if (!profileEditor.passwordsMatch(password, confirmPassword)) {
            return fail(400, {
                invalid: true, 
                message: "passwords don't match",
                token
            });
        }

        let message = "passwords must have minimum eight characters, ";
        message += "at least one letter and one number";

        if (!profileEditor.validNewPassword) {
            return fail(400, {
                invalid: true, 
                message: message,
                token
            });
        }

        await profileEditor.updatePassword(user.email, password);

        await dbFunctions.expireToken(token_id);

        throw redirect(302, "/profile");
    }
}