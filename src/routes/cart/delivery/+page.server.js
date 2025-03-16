export async function load({ locals, params, url }) {
    const infoUpdated = url.searchParams.has("updateInfo");

    if (infoUpdated) {
        return {
            infoUpdated: true
        }
    }
}