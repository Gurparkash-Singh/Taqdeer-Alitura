import { error, fail } from "@sveltejs/kit";
import { MODE, RESEND_API_KEY, RESEND_EMAIL } from '$env/static/private';
import { Resend } from 'resend';
import { dbFunctions } from "$lib/db/database";

const resend = new Resend(RESEND_API_KEY);

export function load({locals}) {
    if (!locals.admin || MODE !== "DEVELOPMENT"){
        error(404);
    }
}

export const actions = {
    send: async ({ request }) => {
        const data = await request.formData();

        const message = data.get("contact-form").trim();
        const email = data.get("email").trim();


        if (!message || !email) {
            await dbFunctions.setError(
                "contact form",
                400,
                `${email} left empty fields` 
            );
            return fail(400, {
                invalid: true,
                message: "fill in all fields",
                email: email,
                body: message
            })
        }

        dbFunctions.saveContactForm(email, message);

        const { returnData, error } = await resend.emails.send({
            from: RESEND_EMAIL,
            to: ['khalsags.fateh@gmail.com', "sandee.ceo@gmail.com"],
            subject: `Taqdeer Website Message from ${email}`,
            text: message
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
                    email: email,
                    body: message
                })
            }

            return fail(500,{
                invalid: true,
                message: "some error occured"
            })
        }

        return {
            success: true,
            message: "message sent successfully"
        };
    }
}