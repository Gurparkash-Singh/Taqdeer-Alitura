import { dbFunctions } from '$lib/db/database';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	await dbFunctions.removeAuth(cookies.get('session'));

	throw redirect(303, '/');
}
