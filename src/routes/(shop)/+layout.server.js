import { redirect } from "@sveltejs/kit";

export function load({locals, cookies}) {
    if (!locals.user) {
        throw redirect(302, "/");
    }
}