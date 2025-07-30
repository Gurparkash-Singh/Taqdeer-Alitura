import { redirect } from "@sveltejs/kit";

export function load({locals, cookies, url}) {
    if (locals.user)
    {
        throw redirect(302, "/profile");
    }

    const token = url.searchParams.get('token');

    if (token) {
        return;
    }

    if (!cookies.get("user_email")) {
        throw redirect(302, "/");
    }

    const email = cookies.get("user_email");

    return {email};
}