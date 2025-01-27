import { fail, redirect } from '@sveltejs/kit';
// import bcrypt from "bcryptjs";
import { dbFunctions } from '$lib/db/database.js';

export const actions = {
    login: async ({cookies, request}) => {
        const data = await request.formData();

        // const email = data.get('email').trim();
        // const password = data.get('password');

        // if (!email || !password)
        // {
        //     return fail(400, {
        //         invalid: true,
        //         message: "Fill all fields",
        //         email
        //     });
        // }

        // const user = await dbFunctions.getUserByEmail(email);

        // if (!user)
        // {
        //     return fail(400, {
        //         invalid: true, 
        //         message: "Email or Password Invalid",
        //         email
        //     });
        // }

        // const verifyPassword = await bcrypt.compare(password, user.Password);

        // if (!verifyPassword) 
        // {
        //     return fail(400, {
        //         invalid: true, 
        //         message: "Email or Password Invalid",
        //         email
        //     });
        // }

        // let query = "UPDATE Users SET AuthToken = ? WHERE Email = ?";
        // const authToken = crypto.randomUUID();

        // await db.query(query, [authToken, email]);

        // cookies.set('session', authToken, {
        //     path: "/",
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 24 * 7
        // });

        // throw redirect(303, '/account');
    }
}