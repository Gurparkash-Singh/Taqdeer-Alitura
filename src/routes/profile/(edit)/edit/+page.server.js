import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const name = data.get("name").trim();
        const email = data.get('email').trim();
        let birthday = data.get('dob').trim();

        if (email) {
            if (locals.user.email !== email) {
                const invalidEmail = await profileEditor.invalidEmail(email);
                
                if (invalidEmail) {
                    return fail(400, {
                        invalid: true,
                        message: invalidEmail,
                        name: name,
                        email: "",
                        DOB: birthday
                    });
                }

                await dbFunctions.updateEmail(email, locals.user.email);

                locals.user.email = email;
            }
        }

        if (name) {
            if (locals.user.name !== name) {
                await dbFunctions.updateName(name, locals.user.email);

                locals.user.name = name;
            }
        }

        if (birthday) {
            if (locals.user.DOB !== birthday) {
                birthday = new Date(birthday);
                birthday.setUTCHours(12);

                await dbFunctions.updateDOB(birthday, locals.user.email);

                locals.user.DOB = birthday.toISOString().split('T')[0];
            }
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}