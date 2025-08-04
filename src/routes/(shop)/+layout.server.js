import { error, redirect } from "@sveltejs/kit";

export function load({locals, cookies, url}) {
    if (url.pathname === "/orders"){
        return;
    }

    if (!locals.user) {
        error(401, "you need to sign in");
    }
}