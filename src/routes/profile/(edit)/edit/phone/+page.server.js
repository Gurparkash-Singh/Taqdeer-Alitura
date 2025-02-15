import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const country = data.get("country");
        const phone = data.get('phone');

        if (!country || !phone) {
            return fail(400, {
                invalid: true,
                message: "fill in all fields",
                country,
                phone
            });
        }

        if (!isValidPhoneNumber(phone, country)) {
            return fail(400, {
                invalid: true,
                message: "invalid phone number or country code",
                country,
                phone
            });
        }

        const phoneNumber = parsePhoneNumberFromString(phone, country);

        await dbFunctions.setPhone(
            phoneNumber.country, 
            phoneNumber.nationalNumber, 
            locals.user.user_id
        );

        locals.user.phone = phoneNumber.nationalNumber;
        locals.user.country = phoneNumber.country;

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}