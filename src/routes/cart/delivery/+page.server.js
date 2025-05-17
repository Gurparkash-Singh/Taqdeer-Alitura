import { fail, redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';
import parsePhoneNumberFromString, { isValidPhoneNumber } from 'libphonenumber-js';
import { aramex } from '$lib/functions/aramex';

export async function load({cookies}) {
    if (cookies.get("order_id")) {
        let [order] = await dbFunctions.getOrderById(cookies.get("order_id"));

        if (order?.status <= 5) {

            let [address] = await dbFunctions.getOrderAddress(order.order_address);

            const existing_order = {
                name: order.name,
                email: order.user_email,
                country: order.country,
                phone: order.telephone,
                address1: address?.address_line1, 
                address2: address?.address_line2,
                city: address?.city,
                province: address?.province,
                postal: address?.postal_code,
                delivery_country: address?.country
            }

            return {
                existing_order
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
            phone,
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country
        }

        const session = cookies.get("session");
        let [shopping_session] = await dbFunctions.getShoppingSessionByToken(session);

        let cartUpdated = await dbFunctions.updateInvalidCart(shopping_session.id);

        if (cartUpdated) {
            returnMessage.message = "some items in your cart were removed\n";
            returnMessage.message += "quantities were not available as selected";
            return fail(400, returnMessage);
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

        const rate = await aramex.calculateRate(
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country
        );

        if (rate.HasErrors) {
            const error = rate.Notifications[0].Message.split("-");
            const errorType = error[0].trim();
            if (errorType == "DestinationAddress") {
                await dbFunctions.setError(
                    "Invalid order address", 
                    400,
                    `${JSON.stringify(data, null, 2)}\n${rate.Notifications}`
                );
                returnMessage.message = error[1];
                return fail(400, returnMessage);
            }
            else {
                await dbFunctions.setError(
                    "Invalid order address", 
                    400,
                    `${JSON.stringify(data, null, 2)}\n${rate.Notifications}`
                );
                returnMessage.message = "something went wrong, order not created";
                return fail(500, returnMessage);
            }
        }

        if (cookies.get("order_id")) {
            let [order] = await dbFunctions.getOrderById(cookies.get("order_id"));

            if (order?.status <= 5) {
                await dbFunctions.updateOrder(
                    cookies.get("order_id"),
                    name, 
                    email,
                    phoneNumber.country,
                    phoneNumber.nationalNumber
                );

                if (order.order_address) {
                    await dbFunctions.updateOrderAddress(
                        order.order_address,
                        address1, 
                        address2,
                        city,
                        province,
                        postal,
                        delivery_country
                    );
                }
                else {
                    await dbFunctions.setOrderAddress(
                        cookies.get("order_id"),
                        address1, 
                        address2,
                        city,
                        province,
                        postal,
                        delivery_country
                    );
                }
    
                throw redirect(302, "/cart/review?updated=true");
            }
        }

        cartUpdated = await dbFunctions.updateInvalidCart(shopping_session.id);

        if (cartUpdated) {
            returnMessage.message = "some items in your cart were removed\n";
            returnMessage.message += "quantities were not available as selected";
            return fail(400, returnMessage);
        }

        let result;

        if (locals.user) {
            result = await dbFunctions.createOrderForExistingUser(
                locals.user.user_id,
                name, 
                email,
                phoneNumber.country,
                phoneNumber.nationalNumber
            );
        }
        else {
            result = await dbFunctions.createOrderForGuest(
                name, 
                email,
                phoneNumber.country,
                phoneNumber.nationalNumber
            );
        }

        cartUpdated = await dbFunctions.updateInvalidCart(shopping_session.id);

        if (cartUpdated) {
            returnMessage.message = "some items in your cart were removed\n";
            returnMessage.message += "quantities were not available as selected";
            return fail(400, returnMessage);
        }

        await dbFunctions.moveItemsToOrder(result.insertId, shopping_session.id);

        await dbFunctions.setOrderAddress(
            result.insertId,
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country
        );

        cookies.set('order_id', result.insertId, {
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        throw redirect(302, '/cart/review');
    }
}