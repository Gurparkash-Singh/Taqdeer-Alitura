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
        let birthday = "";

        if (user.date_of_birth)
        {
            birthday = Date.parse(user.date_of_birth);
            birthday = new Date(birthday);
            birthday = birthday.toISOString().split('T')[0];
        }

        const [admin] = await dbFunctions.getAdmin(user.user_id);

        if (admin) {
            event.locals.admin = admin;
        }

        event.locals.user = {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            date_of_birth: birthday,
            verified_email: user.verified_email,
            verified_phone: user.verified_phone,
            phone: user.telephone,
            country: user.country
        };
    }

    return await resolve(event);
}

export async function handleError({ event, error }) {

    if (error.status == 404){
        await dbFunctions.setError(event.request.url, 404, error.message)
        return;
    }

    console.log(error);

    await dbFunctions.setCriticalError(event.request.url, 500, error.message);
}