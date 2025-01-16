import { dbFunctions } from '$lib/db/database.js';

export const handle = async ({ event, resolve }) => {
    let session = event.cookies.get('session');

    if (!session)
    {
        const authToken = crypto.randomUUID();
        event.cookies.set('session', authToken, {
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        });
        session = authToken;
    }

    const shopping_session = await dbFunctions.getShoppingSessionByToken(session);

    if (shopping_session.length === 0) {
        await dbFunctions.createNewShoppingSession(session);
    }

    // const users = await dbFunctions.getUserByAuthToken(session);

    // if (users.length > 0)
    // {
    //     const user = users[0];

    //     event.locals.user = {
    //         firstName: user.FirstName,
    //         lastName: user.LastName,
    //         email: user.Email,
    //     };
    // }

    return await resolve(event);
}