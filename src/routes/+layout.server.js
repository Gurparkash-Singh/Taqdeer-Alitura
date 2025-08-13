import { EARLY_ACCESS, MODE } from '$env/static/private';
import { dbFunctions } from '$lib/db/database';
import { error } from '@sveltejs/kit';
import axios from 'axios';

export async function load({ cookies, locals }) {
	const session = cookies.get('session');

	let messages = cookies.get('messages');

	let shopping_session = await dbFunctions.getShoppingSessionByToken(session);

	if (!session || shopping_session.length === 0) {
		error(500);
	}

	if (messages) {
		cookies.set('messages', '', {
			path: '/',
			expires: new Date(0)
		});
	} else {
		messages = [];
	}

	if (EARLY_ACCESS === 'TRUE') {
		messages = [];
	}

	shopping_session = shopping_session[0].id;

	let num_items = 0;

	[num_items] = await dbFunctions.getTotalCartQuantity(shopping_session);

	num_items = num_items.quantity;

	let available_currencies = await dbFunctions.getAvailableCurrencies();

	let currency_response;

	try {
		currency_response = await axios.get(
			'https://latest.currency-api.pages.dev/v1/currencies/sar.json'
		);
	} catch (axiosError) {
		if (MODE === 'DEVELOPMENT') {
			currency_response = {
				data: {
					sar: {
						aed: 0.97933333,
						bhd: 0.10026667,
						egp: 13.51472091,
						eur: 0.24612223,
						gbp: 0.20652019,
						kwd: 0.082188105,
						omr: 0.10265457,
						qar: 0.97066667,
						sar: 1,
						usd: 0.26666667
					}
				}
			};
			console.log('Using development values for currency rates');
			console.log('File: /+layout.server.js');
		} else {
			await dbFunctions.setCriticalError('checkout', 500, JSON.stringify(axiosError.response.data));
			error(500);
		}
	}

	let conversion_rates = {};

	for (let i = 0; i < available_currencies.length; i++) {
		const currency_code = available_currencies[i].currency_code;

		let conversion_rate = currency_response.data.sar;
		conversion_rate = conversion_rate[currency_code.toLowerCase()];

		conversion_rates[currency_code] = conversion_rate;
	}

	return {
		num_items,
		messages,
		user: locals.user,
		admin: locals.admin,
		available_currencies,
		conversion_rates
	};
}
