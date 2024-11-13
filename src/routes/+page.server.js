import { fail } from "@sveltejs/kit";
import { RESEND_API_KEY } from '$env/static/private';
// import { Resend } from 'resend';

// Get Resend API Key and npm i resend uncomment line 7 and remove line 8

// const resend = new Resend(RESEND_API_KEY);
const resend = 1;

export const actions = {
    send: async ({ request }) => {
        const data = await request.formData();

        const message = data.get("message").trim();

        if (!message) {
            return fail(400, {
                invalid: true,
                message: "Fill in all fields"
            })
        }

        const { returnData, error } = await resend.emails.send({
            from: 'web-contact@nectarjewels.ca',
            to: ['khalsags.fateh@gmail.com'],
            subject: "Taqdeer Website Message",
            text: `
                ${message}
            `,
        });

        if (error)
        {
            if (error.name == 'validation_error')
            {
                return fail(400, {
                    invalid: true,
                    message: "Make sure your email is correct"
                })
            }

            return fail(500,{
                invalid: true,
                message: "Some Error occured"
            })
        }

        return {
            success: true,
            message: "Message sent successfully"
        };
    }
}