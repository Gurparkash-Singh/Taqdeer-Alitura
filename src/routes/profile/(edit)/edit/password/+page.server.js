import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';
import { profileEditor } from '$lib/functions/profile-editor';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const oldPassword = data.get("old-password");
        const password = data.get('password');
        let confirmPassword = data.get('confirm-password');

        const emptyFields = profileEditor.emptyFields([
            oldPassword,
            password,
            confirmPassword
        ]);

        if (!oldPassword || !password || !confirmPassword) {
            await dbFunctions.setError(
                "password change", 
                400,
                `${locals.user.email} left empty fields` 
            );
            return fail(400, {
                invalid: true, 
                message: "fill in all fields",
            });
        }

        const user = await dbFunctions.getUserByEmail(locals.user.email);

        if (!user) {
            return fail(404, {
                invalid: true, 
                message: "user not found",
            });
        }

        if (!profileEditor.passwordsMatch(password, confirmPassword)) {
            await dbFunctions.setError(
                "password change", 
                400,
                `${locals.user.email} passwords don't match` 
            );
            return fail(400, {
                invalid: true, 
                message: "passwords don't match",
            });
        }

        let message = "passwords must have minimum eight characters, ";
        message += "at least one letter and one number";

        if (!profileEditor.validNewPassword) {
            await dbFunctions.setError(
                "password change", 
                400,
                `${locals.user.email} entered an invalid password` 
            );
            return fail(400, {
                invalid: true, 
                message: message,
            });
        }

        const verifyPassword = await profileEditor.verifyPassword(user, oldPassword);
        
        if (!verifyPassword) 
        {
            await dbFunctions.setError(
                "password change", 
                400,
                `${locals.user.email} entered an incorrect password` 
            );
            return fail(400, {
                invalid: true, 
                message: "password invalid"
            });
        }

        await profileEditor.updatePassword(user.email, password);

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}