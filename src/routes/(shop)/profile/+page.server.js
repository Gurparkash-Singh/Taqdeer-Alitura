import { redirect } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	const verified = url.searchParams.has('verified');

	if (verified) {
		return { verified: true };
	}

	return {
		verified: false
	};
}
