import { dbFunctions } from "$lib/db/database";
import { redirect, fail } from "@sveltejs/kit";
import { aramex } from "$lib/functions/aramex";

export async function load({ locals }) {
    const addresses = await dbFunctions.getUserAddresses(locals.user.user_id);
    
    return {addresses};
}

export const actions = {
    delete: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const address_id = data.get("address-id");

        await dbFunctions.deleteUserAddress(address_id );

        return {
            success: true, 
            message:"address deleted successfully"
        }
    },

    create: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const manual = data.get("manual-entry");
        const address_id = data.get("address-id");

        const name = data.get("name").trim();
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
            address1, 
            address2,
            city,
            province,
            postal,
            delivery_country,
            address_id
        }

        if (manual) {
            if (!address1 || !city || !province || !postal || !delivery_country) {
                returnMessage.message = "fill in all address fields";
                return fail(400, returnMessage);
            }
        }
        else if (!formattedAddress){
            returnMessage.message = "press confirm location";
            return fail(400, returnMessage);
        }

        if (!name) {
            returnMessage.message = "fill in all fields";
            return fail(400, returnMessage);
        }

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
                returnMessage.message = error[1];
                await dbFunctions.setError(
                    "Invalid address", 
                    400,
                    `${JSON.stringify(returnMessage, null, 2)}\n${JSON.stringify(rate.Notifications, null, 2)}}`
                );
                
                return fail(400, returnMessage);
            }
            else {
                returnMessage.message = "something went wrong, address not saved";
                await dbFunctions.setError(
                    "Invalid address",
                    500,
                    `${JSON.stringify(returnMessage, null, 2)}\n${JSON.stringify(rate.Notifications, null, 2)}}`
                );
                return fail(500, returnMessage);
            }
        }

        if (address_id == 0) {
            await dbFunctions.setUserAddress(
                locals.user.user_id,
                name,
                address1, 
                address2,
                city,
                province,
                postal,
                delivery_country
            );

            return {
                success: true, 
                message:"address added successfully"
            }
        }
        else {
             await dbFunctions.updateUserAddress(
                address_id,
                name,
                address1, 
                address2,
                city,
                province,
                postal,
                delivery_country
            );

            return {
                success: true, 
                message:"address updated successfully"
            }
        }
    }
}