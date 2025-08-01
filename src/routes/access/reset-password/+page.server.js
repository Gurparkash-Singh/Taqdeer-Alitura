import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { profileEditor } from '$lib/functions/profile-editor';
import { dbFunctions } from '$lib/db/database.js';
import { RESEND_API_KEY, BASE, RESEND_EMAIL } from '$env/static/private';
import { Resend } from 'resend';
import { createResetEmail } from '$lib/email_templates/reset_password';

const resend = new Resend(RESEND_API_KEY);

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
            await dbFunctions.setError(
                "password reset start", 
                400,
                `${email} no user found` 
            );
            return {
                success: true, 
                message:"email has been sent\nplease follow email instructions"
            }
        }

        const token = cookies.get("session");

        const hashedToken = await bcrypt.hash(token.concat(user.name), 12);

        const reset_link = `${BASE}/access/reset-password/finish-reset?token=${hashedToken}&email=${email}`;

        const message = createResetEmail(reset_link);

        const { returnData, error } = await resend.emails.send({
            from: RESEND_EMAIL,
            to: [email],
            subject: "Taqdeer password reset link",
            html: message
        });

        if (error)
        {
            await dbFunctions.setError(
                "password reset start", 
                400,
                `email not sent to ${email}\nError: ${error.name}` 
            );
            if (error.name == 'validation_error')
            {
                return fail(400, {
                    invalid: true,
                    message: "invalid email",
                    email: email,
                    body: message
                })
            }
            return fail(500,{
                invalid: true,
                message: "some error occured"
            })
        }

        await dbFunctions.storeToken(hashedToken, user.user_id);

        return {
            success: true, 
            message: "email has been sent\nplease follow email instructions"
        }
    }
}