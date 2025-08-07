import { RESEND_API_KEY, RESEND_AUDIENCE_ID } from "$env/static/private"
import { dbFunctions } from "$lib/db/database";
import { Resend } from "resend"

const resend = new Resend(RESEND_API_KEY);

export const load = async ({ locals }) => {
    let subscribed_emails = await resend.contacts.list({
        audienceId: RESEND_AUDIENCE_ID
    });

    let early_access = await dbFunctions.getAllFromEarlyAccess();

    subscribed_emails = subscribed_emails.data.data;

    const indexes = [];

    for (let i = 0; i < early_access.length; i++) {
        for (let j = 0; j < subscribed_emails.length; j++) {
            if (early_access[i].email == subscribed_emails[j].email) {
                indexes.push(j);
            }
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        const result = subscribed_emails.splice(indexes[i], 1);
    }

    return {subscribed_emails, early_access};
}

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const add_list = data.get("add-list");
        const remove_list = data.get("remove-list");

        const add_early_access = JSON.parse(add_list);
        const remove_early_access = JSON.parse(remove_list);

        for (let i = 0; i < add_early_access.length; i++) {
            console.log(add_early_access[i].email);
        }

        for (let j = 0; j < remove_early_access.length; j++) {
            console.log(remove_early_access[j].email);
        }

        return {
            success: true,
            message: "updated early access"
        }
    },

    add: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const email = data.get("email");

        console.log(email);

        return {
            success: true,
            message: "added to early access"
        }
    }
}