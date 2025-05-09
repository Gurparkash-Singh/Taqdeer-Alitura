import { redirect } from "@sveltejs/kit";


export async function load({locals}) {
    if (!locals.admin) {
        throw redirect(302, "/profile");
    }
}