import { fail, redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';
import parsePhoneNumberFromString, { isValidPhoneNumber } from 'libphonenumber-js';
import { aramex } from '$lib/functions/aramex';

export async function load({cookies}) {
    if (cookies.get("order_id")) {
        let [order] = await dbFunctions.getCreatedOrderById(cookies.get("order_id"));

        if (order) {
            return {
                existing_order: {
                    name: order.name,
                    email: order.user_email,
                    country: order.country,
                    phone: order.telephone
                }
            }
        }
    }
}

export const actions = {
    create: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const manual = data.get("manual-entry");

        const name = data.get("name").trim();
        const email = data.get('email').trim();
        const country = data.get("country");
        const phone = data.get("phone");

        const formattedAddress = data.get("formatted-address");
        let address1 = data.get("address1");
        let address2 = data.get("address2");
        let city = data.get("city");
        let province = data.get("province");
        let postal = data.get("postal");
        let delivery_country = data.get("delivery_country");

        postal = postal.replace(" ", "");

        let returnMessage = {
            invalid: true,
            message: "An error occured",
            name,
            email,
            country,
            phone
        }

        if (manual) {
            if (!address1 || !city || !province || !postal || !delivery_country) {
                returnMessage.message = "fill in all address fields";
                return fail(400, returnMessage);
            }
        }
        else if (!formattedAddress){
            returnMessage.message = "fill in address";
            return fail(400, returnMessage);
        }

        if (!name || !email || !country || !phone) {
            returnMessage.message = "fill in all fields";
            return fail(400, returnMessage);
        }

        const invalidEmail = await profileEditor.invalidEmailForCheckout(email);

        if (invalidEmail) {
            await dbFunctions.setError(
                "checkout information", 
                400,
                `${email} is invalid\nError: ${invalidEmail}` 
            );
            returnMessage.message = invalidEmail;
            return fail(400, returnMessage);
        }

        if (!isValidPhoneNumber(phone, country)) {
            returnMessage.message = "invalid phone number or country code";
            return fail(400, returnMessage);
        }

        const phoneNumber = parsePhoneNumberFromString(phone, country);

        await aramex.calculateRate(
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country
        );

        // Get the correct data from google

        // If order does not exist:
        //     Create the order and create an address for the order
        //     Save the order id in cookies

        // If order exists:
        //     Check if (status <= 5) (5 = pending) then update info
        //     else act as if order does not exist

        // if (cookies.get("order_id")) {
        //     let [order] = await dbFunctions.getCreatedOrderById(cookies.get("order_id"));

        //     if (order) {
        //         if (
        //             order.name != name
        //             || order.user_email != email
        //             || order.country != phoneNumber.country
        //             || order.telephone != phoneNumber.nationalNumber
        //         ) {
        //             await dbFunctions.updateOrder(
        //                 cookies.get("order_id"),
        //                 name, 
        //                 email,
        //                 phoneNumber.country,
        //                 phoneNumber.nationalNumber
        //             );
        
        //             throw redirect(302, '/cart/review?updated=true');
        //         }


    
        //         throw redirect(302, "/cart/review");
        //     }
        // }

        // let result;

        // if (locals.user) {
        //     result = await dbFunctions.createOrderForExistingUser(
        //         locals.user.user_id,
        //         name, 
        //         email,
        //         phoneNumber.country,
        //         phoneNumber.nationalNumber
        //     );
        // }
        // else {
        //     result = await dbFunctions.createOrderForGuest(
        //         name, 
        //         email,
        //         phoneNumber.country,
        //         phoneNumber.nationalNumber
        //     );
        // }

        // cookies.set('order_id', result.insertId, {
        //     path: "/",
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 24
        // });

        // throw redirect(302, '/cart/review');
    }
}