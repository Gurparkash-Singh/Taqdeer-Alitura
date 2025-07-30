import { redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database';
import { profileEditor } from '$lib/functions/profile-editor';
import { RESEND_API_KEY, BASE, RESEND_EMAIL } from '$env/static/private';
import { Resend } from 'resend';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "$env/static/private";
import { TWILIO_SERVICE_CODE } from '$env/static/private';
import twilio from "twilio";
import parsePhoneNumberFromString from 'libphonenumber-js';
import { createVerifyEmail } from '$lib/email_templates/verify_email';

const resend = new Resend(RESEND_API_KEY);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function load({ locals, params, url }) {
    let email = url.searchParams.has('email');
    let phone = url.searchParams.has('phone');
    const submitError = url.searchParams.get('error');

    if (phone && !locals.user.phone) {
        throw redirect(302, "/profile/edit/phone");
    }

    let service = "email";

    if (phone) {
        service = "phone";
    }

    if (locals.user.verified_email) {
        service = "phone";
        phone = true;
        email = false;
    }

    if (locals.user.verified_phone) {
        service = "email";
        email = true;
        phone = false;
    }

    const otp = profileEditor.generateOTP();

    const previousTokens = await dbFunctions.getPreviousOTP(locals.user.user_id);

    let time = 60;

    if (previousTokens[0]) {
        time = Date.parse(previousTokens[0].created_at);
        time = new Date(time);
        time = time - (time.getTimezoneOffset() * 60000);
        time = (Date.now() - time) / 1000;
        time = time.toFixed(0);
        time = 60 - time;
    }

    if (submitError == "empty") {
        await dbFunctions.setError(
            "account verification",
            400,
            `${locals.user.email} Empty fields` 
        );
        return {
            service: service,
            wait: "fill in all fields",
            time: time
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
            wait: "token not found or token expired",
            time: time
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
            wait: "please wait 1 minute before asking for a new code",
            time: time
        }
    }

    if (phone) {
        const phone = parsePhoneNumberFromString(locals.user.phone, locals.user.country);
        try {
            await client.verify.v2.services(TWILIO_SERVICE_CODE)
            .verifications.create({
                to: phone.number,
                channel: "sms"
            })
        } catch (error) {
            console.log(error);
        }
        await dbFunctions.createOTP(otp, locals.user.user_id, service);
        return {
            service: "phone",
            time: time
        }
    }

    const message = createVerifyEmail(otp);

    const { returnData, error } = await resend.emails.send({
        from: RESEND_EMAIL,
        to: [locals.user.email],
        subject: "Taqdeer account verification code",
        html: message
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

    return {
        service: "email",
        time: time
    }
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

        if (service == "phone") {
            const phone = parsePhoneNumberFromString(locals.user.phone, locals.user.country);
            const verificationCheck = await client.verify.v2
            .services(TWILIO_SERVICE_CODE)
            .verificationChecks.create({
              code: otp,
              to: phone.number
            });

            if (verificationCheck.status == "approved"){
                await dbFunctions.verifyPhone(locals.user.user_id);
                throw redirect(302, "/profile?verified=true");
            }

            throw redirect(302, `/verify?${service}=true&error=token`);
        }

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