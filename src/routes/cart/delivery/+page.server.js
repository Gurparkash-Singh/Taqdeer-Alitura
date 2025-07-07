import { fail, redirect } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';
import parsePhoneNumberFromString, { isValidPhoneNumber } from 'libphonenumber-js';
import { aramex } from '$lib/functions/aramex';

export async function load({cookies, locals}) {
    let addresses;

    if (locals.user) {
        addresses = await dbFunctions.getUserAddresses(locals.user.user_id);
    }

    if (cookies.get("order_id")) {
        let [order] = await dbFunctions.getOrderById(cookies.get("order_id"));

        if (order?.status <= 5) {
            let address;
            if (order.order_address) {
                [address] = await dbFunctions.getOrderAddress(order.order_address);
            }

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
                delivery_country: address?.country,
                address_id: address.user_address_id
            }

            return {
                existing_order,
                addresses
            }
        }
    }
    else {
        const session = cookies.get("session");
        let shopping_session = await dbFunctions.getShoppingSessionByToken(session);
        shopping_session = shopping_session[0].id;
        const cart_items = await dbFunctions.getItemsForCurrentSession(shopping_session);

        if (cart_items.length == 0){
            throw redirect(302, "/cart");
        }
    }

    return {addresses}
}

export const actions = {
    create: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const manual = data.get("manual-entry");

        const name = data.get("name").trim();
        const email = data.get('email').trim();
        const country = data.get("country");
        const phone = data.get("phone");

        let address_id = data.get("address-id");
        const address_name = data.get("addressName");

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

        if (address_id === "0") {
            if (!address_name) {
                returnMessage.message = "fill in address name";
                return fail(400, returnMessage);
            }
        }
        else if (address_id > 0) {
            const [user_address] = await dbFunctions.getUserAddressById(address_id);

            if (!user_address) {
                returnMessage.message = "address not found";
                return fail(404, returnMessage);
            }

            returnMessage.message = "address components do not match selected address";

            if (user_address.address_line1 != address1) {
                return fail(400, returnMessage)
            }

            if (user_address.address_line2 != address2) {
                return fail(400, returnMessage)
            }

            if (user_address.city != city) {
                return fail(400, returnMessage)
            }

            if (user_address.province != province) {
                return fail(400, returnMessage)
            }

            if (user_address.postal_code != postal) {
                return fail(400, returnMessage)
            }

            if (user_address.country != country) {
                return fail(400, returnMessage)
            }
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

        const cart_items = await dbFunctions.getItemsForCurrentSession(shopping_session.id);

        let item_quantity = 0;
        let customs_value = 0;

        if (cookies.get("order_id")) {
            let [order] = await dbFunctions.getOrderById(cookies.get("order_id"));
            
            const order_items = await dbFunctions.getOrderItems(cookies.get("order_id"));
            
            if ((order?.status <= 5)) {
                for (let i = 0; i < order_items.length; i++) {
                    item_quantity += order_items[i].quantity;
                    customs_value += order_items[i].quantity * order_items[i].price;
                }
            }
        }

        if (item_quantity === 0) {
            for (let i = 0; i < cart_items.length; i++) {
                item_quantity += cart_items[i].quantity;
                customs_value += cart_items[i].quantity * cart_items[i].price;
            }
        }

        const rate = await aramex.calculateRate(
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country,
            item_quantity,
            customs_value,
            0.5
        );

        if (rate.HasErrors) {
            const error = rate.Notifications[0].Message.split("-");
            const errorType = error[0].trim();
            if (errorType == "DestinationAddress") {
                returnMessage.message = error[1];
                await dbFunctions.setError(
                    "Invalid order address", 
                    400,
                    `${JSON.stringify(returnMessage, null, 2)}\n${JSON.stringify(rate.Notifications, null, 2)}}`
                );
                return fail(400, returnMessage);
            }
            else {
                returnMessage.message = "something went wrong, order not created";
                await dbFunctions.setError(
                    "Invalid order address", 
                    400,
                    `${JSON.stringify(returnMessage, null, 2)}\n${JSON.stringify(rate.Notifications, null, 2)}}`
                );
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

                if (address_id === "0"){
                    const address_result = await dbFunctions.setUserAddress(
                        locals.user.user_id,
                        address_name,
                        address1, 
                        address2,
                        city,
                        province,
                        postal,
                        delivery_country
                    );

                    address_id = address_result.insertId;
                }

                if (order.order_address) {
                    await dbFunctions.updateOrderAddress(
                        order.order_address,
                        address1, 
                        address2,
                        city,
                        province,
                        postal,
                        delivery_country,
                        address_id
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
                        delivery_country,
                        address_id
                    );
                }

                await dbFunctions.updateDeliveryRate(
                    cookies.get("order_id"),
                    rate.TotalAmount.Value,
                )
    
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

        if (address_id === "0"){
            console.log("Running");
            const address_result = await dbFunctions.setUserAddress(
                locals.user.user_id,
                address_name,
                address1, 
                address2,
                city,
                province,
                postal,
                delivery_country
            );

            address_id = address_result.insertId;
        }

        await dbFunctions.setOrderAddress(
            result.insertId,
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country,
            address_id
        );

        for (let i = 0; i < cart_items.length; i++) {
            await dbFunctions.createOrderInvoiceItem(
                result.insertId, 
                cart_items[i].price * cart_items[i].quantity,
                cart_items[i].name
            )
        }

        await dbFunctions.createOrderInvoiceItem(
            result.insertId,
            rate.TotalAmount.Value,
            "delivery"
        )

        await dbFunctions.removeAllFromCart(shopping_session.id);

        cookies.set('order_id', result.insertId, {
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        throw redirect(302, '/cart/review');
    }
}