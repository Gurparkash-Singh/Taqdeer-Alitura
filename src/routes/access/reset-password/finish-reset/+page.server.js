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
        await dbFunctions.setError(
            "password reset", 
            400,
            `${email} tried an invalid token` 
        );
        return error(404, {
            invalid: true,
            message: "token not found or token expired"
        })
    }

    const user = await dbFunctions.getUserByAuthToken(token);

    if (!user) {
        await dbFunctions.setError(
            "password reset", 
            400,
            `${email} tried an invalid token` 
        );
        return error(404, {
            invalid: true,
            message: "token not found or token expired"
        })
    }

    return {token, email};
}

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const token = data.get("token");
        const email = data.get("email");
        const password = data.get('password');
        let confirmPassword = data.get('confirm-password');

        if (!email || !token)
        {
            await dbFunctions.setError(
                "password reset", 
                400,
                `${email} had no email or token`
            );
            return fail(400, {
                invalid: true, 
                message: "please retry by using the link in the email again",
                token,
                email
            });
        }

        if (!password || !confirmPassword) {
            await dbFunctions.setError(
                "password reset", 
                400,
                `${email} left a field empty`
            );
            return fail(400, {
                invalid: true, 
                message: "fill in all fields",
                token,
                email
            });
        }

        let [user] = await dbFunctions.getUserByAuthToken(token);

        if (!user) {
            await dbFunctions.setError(
                "password reset", 
                400,
                `${email} tried an invalid token` 
            );
            return fail(400, {
                invalid: true, 
                message: "token expired or not found",
                token,
                email
            });
        }

        const token_id = user.id;

        [user] = await dbFunctions.getUserByID(user.user_id);

        if (!user) {
            await dbFunctions.setError(
                "password reset", 
                400,
                `${email} tried an invalid token` 
            );
            return fail(400, {
                invalid: true, 
                message: "token expired or not found",
                token,
                email
            });
        }

        if (!profileEditor.passwordsMatch(password, confirmPassword)) {
            await dbFunctions.setError(
                "password reset", 
                400,
                `${email} passwords don't match` 
            );
            return fail(400, {
                invalid: true, 
                message: "passwords don't match",
                token,
                email
            });
        }

        let message = "passwords must have minimum eight characters, ";
        message += "at least one letter and one number";

        if (!profileEditor.validNewPassword) {
            await dbFunctions.setError(
                "password reset", 
                400,
                `${email} invalid password` 
            );
            return fail(400, {
                invalid: true, 
                message: message,
                token,
                email
            });
        }

        await profileEditor.updatePassword(user.email, password);

        await dbFunctions.expireToken(token_id);

        throw redirect(302, "/profile");
    }
}