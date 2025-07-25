import { error, fail, redirect } from "@sveltejs/kit";
import { MODE, RESEND_API_KEY, RESEND_EMAIL } from '$env/static/private';
import { Resend } from 'resend';
import { dbFunctions } from "$lib/db/database";
import { createEmailListEmail } from "$lib/email_templates/email_list";

const resend = new Resend(RESEND_API_KEY);

export function load({locals}) {
    if (locals.user){
        throw redirect(302, "/home");
    }
}

export const actions = {
    send: async ({ request, locals, cookies }) => {
        const data = await request.formData();

        const email = data.get("email").trim();

        if (!email) {
            await dbFunctions.setError(
                "homepage",
                400,
                `No email entered` 
            );
            return fail(400, {
                invalid: true,
                message: "fill in all fields"
            })
        }

        const user = await dbFunctions.getUserByEmail(email);

        if (user) {
            cookies.set("user_email", email, {
                path: "/",
                sameSite: 'strict',
                maxAge: 60 * 60 * 24
            });
            throw redirect(302, "/access");
        }

        const early_access = await dbFunctions.earlyAccess(email);

        if (early_access) {
            cookies.set("user_email", email, {
                path: "/",
                sameSite: 'strict',
                maxAge: 60 * 60 * 24
            });
            throw redirect(302, '/access/sign-up');
        }
        
        const [signed_up] = await dbFunctions.getEmailListUser(email);

        if (signed_up) {
            return fail(400, {
                invalid: true,
                message: "already signed up for email list"
            })
        }

        const email_message = createEmailListEmail();

        const { returnData, error } = await resend.emails.send({
            from: RESEND_EMAIL,
            to: ['khalsags.fateh@gmail.com', email],
            subject: "Taqdeer Website Message",
            html: email_message
        });

        if (error)
        {
            await dbFunctions.setError(
                "contact form",
                400,
                `error sending email to ${email}\nError: ${JSON.stringify(error, null, 2)}` 
            );

            if (error.name == 'validation_error')
            {
                return fail(400, {
                    invalid: true,
                    message: "invalid email",
                    email: email
                })
            }

            return fail(500,{
                invalid: true,
                message: "some error occured",
                email
            })
        }

        await dbFunctions.emailListSignup(email);

        return {
            success: true,
            message: "signed up for email list successfully"
        };
    }
}