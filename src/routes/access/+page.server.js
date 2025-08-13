import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { profileEditor } from '$lib/functions/profile-editor';
import { dbFunctions } from '$lib/db/database.js';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		const email = data.get('email').trim();
		const password = data.get('password');

		if (!email || !password) {
			await dbFunctions.setError('login', 400, `${email} left empty fields`);
			return fail(400, {
				invalid: true,
				message: 'fill in all fields',
				email
			});
		}

		const user = await dbFunctions.getUserByEmail(email);

		if (!user) {
			await dbFunctions.setError('login', 400, `${email} does not have an account`);
			return fail(400, {
				invalid: true,
				message: 'email or password invalid',
				email
			});
		}

		const verifyPassword = await profileEditor.verifyPassword(user, password);

		if (!verifyPassword) {
			await dbFunctions.setError('login', 400, `${email} did not enter a correct password`);
			return fail(400, {
				invalid: true,
				message: 'email or password invalid',
				email
			});
		}

		await dbFunctions.storeAuth(cookies.get('session'), user.user_id);

		throw redirect(303, '/profile');
	}
};
