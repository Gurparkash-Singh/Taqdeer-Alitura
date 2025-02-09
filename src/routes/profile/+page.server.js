export async function load({ locals, params, url }) {
    const verified = url.searchParams.has('verified');

    if (verified) {
        return {verified: true}
    }
}