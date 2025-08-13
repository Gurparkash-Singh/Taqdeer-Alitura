import { RESEND_API_KEY, RESEND_AUDIENCE_ID, RESEND_EMAIL } from '$env/static/private';
import { dbFunctions } from '$lib/db/database';
import { createEarlyAccessEmail } from '$lib/email_templates/early_access';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export const load = async ({ locals }) => {
	let subscribed_emails = await resend.contacts.list({
		audienceId: RESEND_AUDIENCE_ID
	});

	let early_access = await dbFunctions.getAllFromEarlyAccess();

	subscribed_emails = subscribed_emails.data.data;

	const indexes = [];

	for (let i = 0; i < early_access.length; i++) {
		for (let j = 0; j < subscribed_emails.length; j++) {
			if (early_access[i].email == subscribed_emails[j].email) {
				indexes.push(j);
			}
		}
	}

	for (let i = 0; i < indexes.length; i++) {
		const result = subscribed_emails.splice(indexes[i], 1);
	}

	return { subscribed_emails, early_access };
};

export const actions = {
	submit: async ({ locals, cookies, request }) => {
		const data = await request.formData();

		const add_list = data.get('add-list');
		const remove_list = data.get('remove-list');

		const add_early_access = JSON.parse(add_list);
		const remove_early_access = JSON.parse(remove_list);

		const toSend = [];

		for (let i = 0; i < add_early_access.length; i++) {
			let email = add_early_access[i].email;
			await dbFunctions.addToEarlyAccess(email);
			const message = createEarlyAccessEmail(email);
			const email_request = {
				from: RESEND_EMAIL,
				to: email,
				subject: 'Taqdeer Alitura early access',
				html: message
			};
			toSend.push(email_request);
		}

		for (let j = 0; j < remove_early_access.length; j++) {
			let email = remove_early_access[j].email;
			await dbFunctions.deleteEarlyAccess(email);
		}

		if (toSend.length === 0) {
			return {
				success: true,
				message: 'updated early access'
			};
		}

		const { returnData, error } = await resend.batch.send(toSend);

		if (error) {
			await dbFunctions.setError(
				'early access',
				400,
				`error sending email to ${JSON.stringify(toSend)}\nError: ${JSON.stringify(error, null, 2)}`
			);

			if (error.name == 'validation_error') {
				return fail(400, {
					invalid: true,
					message: 'invalid email',
					email: email
				});
			}
			return fail(500, {
				invalid: true,
				message: 'some error occured',
				email
			});
		}

		return {
			success: true,
			message: 'updated early access'
		};
	},

	add: async ({ locals, cookies, request }) => {
		const data = await request.formData();

		const email = data.get('email');

		await dbFunctions.addToEarlyAccess(email);

		const email_message = createEarlyAccessEmail();

		const { returnData, error } = await resend.emails.send({
			from: RESEND_EMAIL,
			to: email,
			subject: 'Taqdeer Alitura early access',
			html: email_message
		});

		if (error) {
			await dbFunctions.setError(
				'early access',
				400,
				`error sending email to ${email}}\nError: ${JSON.stringify(error, null, 2)}`
			);

			if (error.name == 'validation_error') {
				return fail(400, {
					invalid: true,
					message: 'invalid email',
					email: email
				});
			}
			return fail(500, {
				invalid: true,
				message: 'some error occured',
				email
			});
		}

		return {
			success: true,
			message: 'added to early access'
		};
	}
};
