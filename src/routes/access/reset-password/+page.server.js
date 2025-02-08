import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { profileEditor } from '$lib/functions/profile-editor';
import { dbFunctions } from '$lib/db/database.js';

export const actions = {
    reset: async ({cookies, request}) => {
        const data = await request.formData();

        const email = data.get('email').trim();

        if (!email) {
            return fail(400, {
                invalid: true,
                message: "fill in email",
                email
            });
        }

        const user = await dbFunctions.getUserByEmail(email);

        if (!user)
        {
            return {
                success: true, 
                message:"email has been sent if account exists"
            }
        }

        return {
            success: true, 
            message:"email has been sent if account exists"
        }
    }
}