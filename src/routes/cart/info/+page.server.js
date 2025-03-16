import { fail, redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';
import parsePhoneNumberFromString, { isValidPhoneNumber } from 'libphonenumber-js';

export const actions = {
    create: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const name = data.get("name").trim();
        const email = data.get('email').trim();
        const country = data.get("country");
        const phone = data.get("phone");

        if (!name || !email || !country || !phone) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields",
                name,
                email,
                country,
                phone
            });
        }

        const invalidEmail = await profileEditor.invalidEmailForCheckout(email);

        if (invalidEmail) {
            await dbFunctions.setError(
                "checkout information", 
                400,
                `${email} is invalid\nError: ${invalidEmail}` 
            );
            return fail(400, {
                invalid: true,
                message: invalidEmail,
                name: name,
                email: "",
                country,
                phone
            });
        }

        if (!isValidPhoneNumber(phone, country)) {
            return fail(400, {
                invalid: true,
                message: "invalid phone number or country code",
                name,
                email,
                country,
                phone
            });
        }

        const phoneNumber = parsePhoneNumberFromString(phone, country);

        const result = await dbFunctions.createOrder(
            name, 
            email,
            phoneNumber.country,
            phoneNumber.nationalNumber
        );

        throw redirect(302, '/cart/delivery');
    }
}