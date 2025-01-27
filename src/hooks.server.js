import { dbFunctions } from '$lib/db/database.js';

export const handle = async ({ event, resolve }) => {
    let session = event.cookies.get('session');

    if (!session)
    {
        const authToken = crypto.randomUUID();
        event.cookies.set('session', authToken, {
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });
        session = authToken;

        const messages = await dbFunctions.getMessages();

        event.cookies.set("messages", messages, {
            path: "/",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        });
    }

    const shopping_session = await dbFunctions.getShoppingSessionByToken(session);

    if (shopping_session.length === 0) {
        await dbFunctions.createNewShoppingSession(session);
    }

    const users = await dbFunctions.getUserByAuthToken(session);

    if (!users) {
        return await resolve(event);
    }

    const [user] = await dbFunctions.getUserByID(users[0].user_id);

    if (user)
    {
        event.locals.user = {
            name: user.name,
            email: user.email
        };
    }

    return await resolve(event);
}