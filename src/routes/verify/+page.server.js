import { redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';
import { profileEditor } from '$lib/functions/profile-editor';
import { RESEND_API_KEY, BASE } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export async function load({ locals, params, url }) {
    const email = url.searchParams.has('email');
    const phone = url.searchParams.has('phone');
    const submitError = url.searchParams.get('error');

    if (phone && !locals.user.phone) {
        throw redirect(302, "/profile/edit/phone");
    }

    let service = "email";

    if (phone) {
        service = "phone";
    }

    const otp = profileEditor.generateOTP();

    const previousTokens = await dbFunctions.getPreviousOTP(locals.user.user_id);

    if (submitError == "empty") {
        await dbFunctions.setError(
            "account verification",
            400,
            `${locals.user.email} Empty fields` 
        );
        return {
            service: service,
            wait: "fill in all fields"
        }
    }

    if (submitError == "token") {
        await dbFunctions.setError(
            "account verification",
            400,
            `${locals.user.email} invalid token` 
        );
        return {
            service: service,
            wait: "token not found or token expired"
        }
    }

    if (previousTokens.length > 0) {
        await dbFunctions.setError(
            "account verification",
            400,
            `${locals.user.email} asked for code too soon`
        );
        return {
            service: service,
            wait: "please wait 2 minutes before asking for a new code"
        }
    }

    if (phone) {
        return {service: "phone"}
    }

    let message = `<h1>${otp}</h1>`;
    message += "<p>Fill in OTP on website</p>";
    message += "<p>OTP will expire in 5 minutes</p>";
    message += "<p>Form will auto submit</p>";

    const { returnData, error } = await resend.emails.send({
        from: 'verify@gurparkashsingh.com',
        to: [locals.user.email],
        subject: "Taqdeer account verification code",
        html: message,
    });

    if (error)
    {
        await dbFunctions.setError(
            "account verification",
            400,
            `error sending email to ${locals.user.email}\nError: ${error}`
        );
        if (error.name == 'validation_error')
        {
            return 400, {
                invalid: true,
                message: "invalid email",
                email: email,
                body: message
            }
        }
        return 500,{
            invalid: true,
            message: "some error occured"
        }
    }

    await dbFunctions.createOTP(otp, locals.user.user_id, service);

    return {service: "email"}
}

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const otp = data.get("otp").trim();
        const service = data.get("service");

        if (!otp || !service) {
            throw redirect(302, `/verify?${service}=true&error=empty`);
        }

        const [token] = await dbFunctions.getOTP(otp);

        if (!token) {
            throw redirect(302, `/verify?${service}=true&error=token`);
        }

        if (token.token != otp) {
            throw redirect(302, `/verify?${service}=true&error=token`);
        }

        if (token.service != service) {
            throw redirect(302, `/verify?${service}=true&error=service`);
        }

        await dbFunctions.verifyEmail(token.user_id);

        throw redirect(302, "/profile?verified=true");
    },

    send: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const service = data.get("service");
        const otp = profileEditor.generateOTP();

        if (!service) {
            await dbFunctions.setError(
                "account verification",
                400,
                `${locals.user.email} empty fields`
            );
            return fail(400, {
                invalid: true, 
                message: "fill in all fields",
                service
            });
        }

        if (service == "phone")
        {
            throw redirect(302, "/verify?phone=true")
        }
        
        throw redirect(302, "/verify?email=true");
    }
}