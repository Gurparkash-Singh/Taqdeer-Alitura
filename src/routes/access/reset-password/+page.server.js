import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { profileEditor } from '$lib/functions/profile-editor';
import { dbFunctions } from '$lib/db/database.js';
import { RESEND_API_KEY, BASE } from '$env/static/private';
import { Resend } from 'resend';

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
            return {
                success: true, 
                message:"email has been sent\nplease follow email instructions"
            }
        }

        const token = cookies.get("session").concat(user.name);

        const hashedToken = await bcrypt.hash(token, 12);

        let message = "Password Reset Link expires in 15 minutes: \n";
        message += `${BASE}`;
        message += "access/reset-password/finish-reset?token="
        message += hashedToken;

        const { returnData, error } = await resend.emails.send({
            from: 'reset@gurparkashsingh.com',
            to: [email],
            subject: "Taqdeer password reset link",
            text: message,
        });

        if (error)
        {
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