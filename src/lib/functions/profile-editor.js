import { TESTMAIL_TOKEN } from "$env/static/private";
import bcrypt from "bcryptjs";
import { dbFunctions } from '$lib/db/database.js';
import axios from "axios";
import { getRandomValues } from "node:crypto";

export const profileEditor = {
    emptyFields: (formData) => {

        formData.forEach(field => {
            if (!field) {
                return true;
            }
        });

        return false;
    },

    passwordsMatch: (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return false;
        }

        return true;
    },

    validNewPassword: (password) => {
        if (!/[A-Z]/g.test(password))
        {
            return false;
        }

        if (!/[a-z]/g.test(password))
        {
            return false;
        }

        if (!/[\d]/g.test(password))
        {
            return false;
        }

        if (password.length < 8)
        {
            return false;
        }

        return true;
    },

    invalidEmail: async (email) => {
        let user = await dbFunctions.getUserByEmail(email);

        if (user) {
            return "email taken";
        }

        let data;

        try {
            data = await axios({
                method: 'get',
                url: `https://api.testmail.top/domain/check`,
                params: {
                    data: email
                },
                headers: {
                    'Authorization': TESTMAIL_TOKEN,
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (error) {
            return "something went wrong with email validation";
        }

        if (!data.data.result) {
            switch(data.data.error) {
                case 31:
                    return "please check email address syntax"
                case 32:
                    return "please check email address syntax"
                case 34:
                    return "please check email address syntax"
                case 37:
                    return "incoming data is too long"
                case 777:
                    return "something went wrong with email validation";
            }
            return "invalid email";
        }

        return false;
    },

    createUser: async (email, password, name, session) => {
        const encryptedPass = await bcrypt.hash(password, 10);

        const [user] = await dbFunctions.createUser(email, encryptedPass, name);

        await dbFunctions.storeAuth(session, user.user_id);
    },

    verifyPassword: async (user, password) => {
        return await bcrypt.compare(password, user.password);
    },

    updatePassword: async (email, password) => {
        const encryptedPass = await bcrypt.hash(password, 10);

        await dbFunctions.updatePassword(encryptedPass, email);
    },

    generateOTP: () => {
        const array = new Int8Array(6);
        const filledArray = getRandomValues(array);
        let otp = "";

        for (let i = 0; i < array.length; i++) {
            if (array[i] < 0) {
                array[i] *= -1;
            }
            otp += array[i].toString();
        }

        if (otp.length > 6) {
            otp = otp.slice(0, 6);
        }

        return otp;
    }
};