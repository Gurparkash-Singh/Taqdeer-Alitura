import { redirect } from "@sveltejs/kit";

export function load({locals, cookies}) {
    if (locals.user)
    {
        throw redirect(302, "/profile");
    }

    if (!cookies.get("user_email")) {
        throw redirect(302, "/");
    }

    const email = cookies.get("user_email");

    return {email};
}