import { RESEND_API_KEY, RESEND_AUDIENCE_ID } from "$env/static/private";
import { dbFunctions } from "$lib/db/database";
import { error, fail } from "@sveltejs/kit";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export async function load({params, url}) {
    const token = url.searchParams.get('token');
    const submit = url.search;

    if (submit == "?/submit")
    {
        return;
    }

    if (!token) {
        error(404, "token not found");
    }

    const [found] = await dbFunctions.getEmailUnsubscribeToken(token);

    if (!found) {
        error(404, "token not found");
    }

    return {token}
}

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const token = data.get("token");

        if (!token)
        {
            return fail(404, {
                invalid: true, 
                message: "token not found",
                token
            });
        }

        const [db_token] = await dbFunctions.getEmailUnsubscribeToken(token);

        if (!db_token) {
            return fail(404, {
                invalid: true, 
                message: "token not found",
                token
            });
        }

        let email = false;

        let subscribed_emails = await resend.contacts.list({
            audienceId: RESEND_AUDIENCE_ID
        });

        subscribed_emails = subscribed_emails.data.data;

        for (let i = 0; i < subscribed_emails.length; i++) {
            if (subscribed_emails[i].email == db_token.email) {
                email = subscribed_emails[i]
                break;
            }
        }

        if (!email) {
            return fail(404, {
                invalid: true, 
                message: "email not found",
                token
            });
        }

        resend.contacts.remove({
            email: email.email,
            audienceId: 'dfb7bdbd-6d1a-45af-a821-7ad17950d191',
        });

        await dbFunctions.deleteUnsubscribeTokens(email.email);

        return {
            success: true,
            message: "successfully unsubscribed"
        }
    }
}