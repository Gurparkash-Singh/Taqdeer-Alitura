import { fail } from "@sveltejs/kit";
import { RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export const actions = {
    send: async ({ request }) => {
        const data = await request.formData();

        const message = data.get("contact-form").trim();
        const email = data.get("email").trim();


        if (!message || !email) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields",
                email: email,
                body: message
            })
        }

        const { returnData, error } = await resend.emails.send({
            from: 'web-contact@gurparkashsingh.com',
            to: ['khalsags.fateh@gmail.com', email],
            subject: "Taqdeer Website Message",
            text: message
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

        return {
            success: true,
            message: "message sent successfully"
        };
    }
}