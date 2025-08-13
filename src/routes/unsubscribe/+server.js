import { RESEND_API_KEY } from '$env/static/private';
import { dbFunctions } from '$lib/db/database';
import { json } from '@sveltejs/kit';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export async function POST({ request, cookies, url }) {
	const token = url.searchParams.get('token');

	if (!token) {
		return json({ result: 'pass in token' }, { status: 400 });
	}

	const [db_token] = await dbFunctions.getEmailUnsubscribeToken(token);

	if (!db_token) {
		return json({ result: 'token not found' }, { status: 404 });
	}

	const [email] = await dbFunctions.getEmailListUser(db_token.email);

	if (!email) {
		return json({ result: 'email not found' }, { status: 404 });
	}

	resend.contacts.remove({
		email: email.email,
		audienceId: 'dfb7bdbd-6d1a-45af-a821-7ad17950d191'
	});

	await dbFunctions.unsubscribe(email.email);

	return json({ result: 'success' }, { status: 200 });
}
