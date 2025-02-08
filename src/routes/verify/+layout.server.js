import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    if (!locals.user)
    {
        throw redirect(302, '/access');
    }

    if (locals.user.verified_email) {
        throw redirect(302, '/profile');
    }
}