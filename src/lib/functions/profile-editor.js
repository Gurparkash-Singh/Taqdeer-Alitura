import { TESTMAIL_TOKEN, PROD_SK_TAP } from '$env/static/private';
import bcrypt from 'bcryptjs';
import { dbFunctions } from '$lib/db/database.js';
import axios from 'axios';
import { getRandomValues } from 'node:crypto';

export const profileEditor = {
	emptyFields: async (formData) => {
		formData.forEach((field) => {
			if (!field) {
				return true;
			}
		});

		return false;
	},

	passwordsMatch: (password, confirmPassword) => {
		if (password !== confirmPassword) {
			return false;
		}

		return true;
	},

	validNewPassword: (password) => {
		if (!/[A-Z]/g.test(password)) {
			return false;
		}

		if (!/[a-z]/g.test(password)) {
			return false;
		}

		if (!/[\d]/g.test(password)) {
			return false;
		}

		if (password.length < 8) {
			return false;
		}

		return true;
	},

	invalidEmailForCheckout: async (email) => {
		let data;

		try {
			data = await axios({
				method: 'get',
				url: `https://api.testmail.top/domain/check`,
				params: {
					data: email
				},
				headers: {
					Authorization: TESTMAIL_TOKEN,
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			await dbFunctions.setError('email validation', 500, error.message);
			return 'something went wrong with email validation';
		}

		if (!data.data.result) {
			switch (data.data.error) {
				case 31:
					return 'please check email address syntax';
				case 32:
					return 'please check email address syntax';
				case 34:
					return 'please check email address syntax';
				case 37:
					return 'incoming data is too long';
				case 777:
					return 'something went wrong with email validation';
			}
			return 'invalid email';
		}

		return false;
	},

	invalidEmail: async (email) => {
		let user = await dbFunctions.getUserByEmail(email);

		if (user) {
			return 'email taken';
		}

		let data;

		try {
			data = await axios({
				method: 'get',
				url: `https://api.testmail.top/domain/check`,
				params: {
					data: email
				},
				headers: {
					Authorization: TESTMAIL_TOKEN,
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			await dbFunctions.setError('email validation', 500, error.message);
			return 'something went wrong with email validation';
		}

		if (!data.data.result) {
			switch (data.data.error) {
				case 31:
					return 'please check email address syntax';
				case 32:
					return 'please check email address syntax';
				case 34:
					return 'please check email address syntax';
				case 37:
					return 'incoming data is too long';
				case 777:
					return 'something went wrong with email validation';
			}
			return 'invalid email';
		}

		return false;
	},

	createUserInTap: async (name, email) => {
		const options = {
			method: 'POST',
			url: 'https://api.tap.company/v2/customers',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${PROD_SK_TAP}`
			},
			data: {
				first_name: name,
				email: email
			}
		};

		let customer_id;
		try {
			const data = await axios.request(options);
			return data.data.id;
		} catch (axiosError) {
			await dbFunctions.setCriticalError(
				'create tap customer',
				500,
				JSON.stringify(axiosError.response.data)
			);
			throw axiosError;
		}
	},

	deleteCardFromTap: async (customer_id, card_id) => {
		const options = {
			method: 'DELETE',
			url: `https://api.tap.company/v2/card/${customer_id}/${card_id}`,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${PROD_SK_TAP}`
			}
		};

		try {
			const data = await axios.request(options);
			return data;
		} catch (axiosError) {
			await dbFunctions.setCriticalError(
				'remove customer card',
				500,
				JSON.stringify(axiosError.response.data)
			);
			throw axiosError;
		}
	},

	createUser: async (email, password, name, session) => {
		const encryptedPass = await bcrypt.hash(password, 10);

		const tap_id = await profileEditor.createUserInTap(name, email);

		const [user] = await dbFunctions.createUser(email, encryptedPass, name, tap_id);

		await dbFunctions.storeAuth(session, user.user_id);
	},

	verifyPassword: async (user, password) => {
		return await bcrypt.compare(password, user.password);
	},

	updatePassword: async (email, password) => {
		const encryptedPass = await bcrypt.hash(password, 10);

		await dbFunctions.updatePassword(encryptedPass, email);
	},

	generateOTP: () => {
		const array = new Int8Array(6);
		const filledArray = getRandomValues(array);
		let otp = '';

		for (let i = 0; i < array.length; i++) {
			if (array[i] < 0) {
				array[i] *= -1;
			}
			otp += array[i].toString();
		}

		if (otp.length > 6) {
			otp = otp.slice(0, 6);
		}

		return otp;
	}
};
