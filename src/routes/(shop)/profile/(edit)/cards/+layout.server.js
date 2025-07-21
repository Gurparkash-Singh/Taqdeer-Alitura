import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

export const load = async ({ locals, url }) => {
    if (!locals.admin)
    {
        error(404);
    }
}