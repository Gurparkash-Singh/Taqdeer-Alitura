import { redirect } from "@sveltejs/kit";

export function load({locals, cookies, url}) {
    if (url.pathname === "/orders"){
        return;
    }

    if (!locals.user) {
        throw redirect(302, "/");
    }
}