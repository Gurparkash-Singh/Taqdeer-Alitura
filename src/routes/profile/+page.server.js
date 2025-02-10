import { redirect } from "@sveltejs/kit";

export async function load({ locals, params, url }) {
    if (locals.admin)
    {
        throw redirect(302, '/admin');
    }

    const verified = url.searchParams.has('verified');

    if (verified) {
        return {verified: true}
    }
}