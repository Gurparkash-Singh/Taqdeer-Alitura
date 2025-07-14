import { redirect } from "@sveltejs/kit";

export function load({locals}) {
    if (locals.user) {
        return;
    }

    
}