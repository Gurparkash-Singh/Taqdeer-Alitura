import { fail } from '@sveltejs/kit';
import { dbFunctions } from '$lib/db/database.js';
import { profileEditor } from '$lib/functions/profile-editor';

export const actions = {
    submit: async ({ locals, cookies, request }) => {
        const data = await request.formData();

        const name = data.get("name").trim();
        const email = data.get('email').trim();
        let birthday = data.get('date_of_birth').trim();

        if (email) {
            if (locals.user.email !== email) {
                const invalidEmail = await profileEditor.invalidEmail(email);
                
                if (invalidEmail) {
                    await dbFunctions.setError(
                        "edit profile",
                        400,
                        `${locals.user.email} entered an invalid email\n
                        email: ${email}\n
                        Error: ${invalidEmail}
                        ` 
                    );
                    return fail(400, {
                        invalid: true,
                        message: invalidEmail,
                        name: name,
                        email: "",
                        date_of_birth: birthday
                    });
                }

                await dbFunctions.updateEmail(email, locals.user.email);

                locals.user.email = email;
                locals.user.verified_email = false;
            }
        }

        if (name) {
            if (locals.user.name !== name) {
                await dbFunctions.updateName(name, locals.user.email);

                locals.user.name = name;
            }
        }

        if (birthday) {
            if (locals.user.date_of_birth !== birthday) {
                birthday = new Date(birthday);

                await dbFunctions.updateDOB(birthday, locals.user.email);

                locals.user.date_of_birth = birthday.toISOString().split('T')[0];
            }
        }

        return {
            success: true, 
            message:"values updated successfully"
        }
    }
}