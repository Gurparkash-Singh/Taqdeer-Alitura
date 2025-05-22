import { MODE } from "$env/static/private";
import { redirect } from "@sveltejs/kit";


export async function load({locals}) {
    if (MODE != "DEVELOPMENT")
    {
        if (!locals.admin) {
            throw redirect(302, "/profile");
        }
    }
}