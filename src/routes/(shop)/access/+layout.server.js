import { redirect } from '@sveltejs/kit';

export function load({ locals, cookies, url }) {
	if (locals.user) {
		throw redirect(302, '/profile');
	}
}
