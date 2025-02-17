import mysql from "mysql2";
import { DATABASE_URL, MODE } from "$env/static/private";
import { RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export let db;
try {
    db = mysql.createPool(DATABASE_URL).promise();
} catch (dbError) {
    if (MODE != "DEVELOPMENT") {
        const { returnData, error } = await resend.emails.send({
            from: 'web-contact@gurparkashsingh.com',
            to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
            subject: "Taqdeer Website Error",
            text: `cannot connect to database\nError: ${dbError.code}`,
        });
    }
}

export const dbFunctions = {
    getCategories: async () => {
        let query = "SELECT category_id, category_name FROM Category;";
        
        const [result] = await db.query(query);

        return result;
    },

    getCollections: async () => {
        const [result] = await db.query("SELECT collection_id, collection_name FROM Collections;");

        return result;
    },

    getUserByEmail: async (email) => {
        let query = "SELECT * FROM User WHERE Email = ?";

        const [users] = await db.query(query, email);

        if (users.length > 0) {
            return users[0];
        }

        return;
    },

    getProducts: async (sort_asc = true, limit = 0, offset = 0) => {
        let query = "SELECT * FROM Products WHERE live = 1 ORDER BY Price ";

        if (sort_asc == true)
        {
            query += "ASC";
        }
        else
        {
            query += "DESC";
        }

        if (limit > 0)
        {
            query += ` LIMIT ${limit}`;
        }

        if (offset > 0)
        {
            query += ` OFFSET ${offset}`;
        }

        query += ";";

        const [products] = await db.query(query);

        return products;
    },

    getProductById: async (id) => {
        let query = "SELECT * FROM Products WHERE product_id = ? AND live = 1;";

        const [products] = await db.query(query, id);

        return products;
    },

    getMainImages: async () => {
        let query = "SELECT * FROM Images WHERE main_image = 1;";

        const [images] = await db.query(query);

        return images;
    },

    getImagesByProductId: async (product_id) => {
        let query = "SELECT * FROM Images WHERE product_id = ? ";
        query += "ORDER BY image_id;";

        const [images] = await db.query(query, product_id);

        return images;
    },

    getProductSizes: async (product_id) => {
        let query = "SELECT * FROM Sizes_Available WHERE product_id = ?;";

        const [sizes] = await db.query(query, product_id);

        return sizes;
    },

    getShoppingSessionByToken: async (token) => {
        let query = "SELECT * FROM Shopping_Session WHERE token = ?;";

        const [session] = await db.query(query, token);

        return session;
    },

    createNewShoppingSession: async (token) => {
        let query = "INSERT INTO Shopping_Session (token) VALUES (?);";

        await db.query(query, token);
    },

    checkCartForProduct: async (session_id, product_id, size_id) => {
        let query = "SELECT * FROM Cart_Items ";
        query += "WHERE session_id = ? AND product_id = ? AND size_id = ?;";

        const [items] = await db.query(query, [session_id, product_id, size_id]);

        return items;
    },

    addToCart: async (id, product_id, size_id, quantity) => {
        let query = "INSERT INTO Cart_Items ";
        query += "(session_id, product_id, size_id, quantity) ";
        query += "VALUES (?, ?, ?, ?);";

        await db.query(query, [id, product_id, size_id, quantity]);
    },

    updateCart: async (id, product_id, size_id, quantity) => {
        let query = "UPDATE Cart_Items SET quantity = ? ";
        query += "WHERE session_id = ? AND product_id = ? AND size_id = ?;";

        await db.query(query, [quantity,id, product_id, size_id]);
    },

    removeFromCart: async (id, product_id, size_id) => {
        let query = "DELETE FROM Cart_Items ";
        query += "WHERE session_id = ? AND product_id = ? AND size_id = ?;";

        await db.query(query, [id, product_id, size_id]);
    },

    getItemsForCurrentSession: async (id) => {
        let query = "SELECT ";
        query += "Cart_Items.product_id, Cart_Items.size_id, Cart_Items.quantity, ";
        query += "Products.name, Products.description, price, ";
        query += "image_link, alt_desc, size_name, size_abbreviation ";
        query += "FROM Cart_Items ";
        query += "JOIN Products ON Products.product_id = Cart_Items.product_id ";
        query += "JOIN Images ON Images.product_id = Cart_Items.product_id ";
        query += "JOIN Sizes_Available ON Sizes_Available.size_id = Cart_Items.size_id ";
        query += "WHERE session_id = ? AND main_image = 1;";

        const [items] = await db.query(query, id);

        return items;
    },

    getMessages: async () => {
        let query = "SELECT * FROM Messages WHERE broadcast = 1;";

        const [messages] = await db.query(query);

        return messages;
    },

    getProductComponents: async (id) => {
        let query = "SELECT * FROM Components WHERE product_id = ?;";

        const [components] = await db.query(query, id);

        return components;
    },

    getComponentProperties: async (id) => {
        let query = "SELECT Components.component_id, component_name, ";
        query += "property_name, property_value ";
        query += "FROM Components ";
        query += "JOIN Component_Properties ON ";
        query += "Components.component_id ";
        query += "= Component_Properties.component_id ";
        query += "WHERE Components.product_id = ? ";
        query += "ORDER BY Components.component_id;";

        const [properties] = await db.query(query, id);

        return properties;
    },

    createUser: async (email, pass, name) => {
        let query = "INSERT INTO User (email, password, name) "
        query += "VALUES (?, ?, ?);";

        await db.query(
            query, [email, pass, name]
        );

        query = "SELECT * FROM User WHERE email = ?;";

        const [users] = await db.query(query, email);

        if (users.length > 0)
        {
            return users;
        }

        console.log(users);

        return;
    },

    storeAuth: async (session, id) => {
        let query = "INSERT INTO User_Tokens (user_id, token, expires_at) ";
        query += "VALUES (?, ?, now()+interval 1 day);";

        await db.query(query, [id, session]);
    },

    storeToken: async (session, id) => {
        let query = "INSERT INTO User_Tokens (user_id, token, expires_at) ";
        query += "VALUES (?, ?, now()+interval 15 minute);";

        await db.query(query, [id, session]);
    },

    getUserByAuthToken: async (session) => {
        let query = "SELECT * FROM User_Tokens WHERE token = ? ";
        query += "AND expires_at > now();";

        const [users] = await db.query(query, session);

        if (users.length > 0)
        {
            return users;
        }

        return;
    },

    getUserByID: async (id) => {
        let query = "SELECT * FROM User WHERE user_id = ?;";

        const [user] = await db.query(query, id);

        return user;
    },

    updateEmail: async (newEmail, email) => {
        let query = "UPDATE User SET email = ? WHERE email = ?;";

        await db.query(query, [newEmail, email]);
    },

    updateName: async (name, email) => {
        let query = "UPDATE User SET name = ? WHERE email = ?;";

        await db.query(query, [name, email]);
    },

    updateDOB: async (date_of_birth, email) => {
        let query = "UPDATE User SET date_of_birth = ? WHERE email = ?;";

        await db.query(query, [date_of_birth, email]);
    },

    updatePassword: async (password, email) => {
        let query = "UPDATE User SET password = ? WHERE email = ?;";

        await db.query(query, [password, email]);
    },

    expireToken: async (token_id) => {
        let query = "UPDATE User_Tokens SET expires_at = now() WHERE ";
        query += "id = ?;";

        await db.query(query, token_id);
    },

    createOTP: async (session, id, service) => {
        let query = "INSERT INTO User_OTP (user_id, token, service, expires_at) ";
        query += "VALUES (?, ?, ?, now()+interval 5 minute);";

        await db.query(query, [id, session, service]);
    },

    getPreviousOTP: async (user_id) => {
        let query = "SELECT * FROM User_OTP WHERE user_id = ? "
        query += "AND created_at > now() - interval 2 minute;";

        const [tokens] = await db.query(query, user_id);

        return tokens;
    },

    getOTP: async (otp) => {
        let query = "SELECT * FROM User_OTP WHERE token = ? "
        query += "AND expires_at > now();";

        const [tokens] = await db.query(query, otp);

        return tokens;
    },

    expireOTP: async (user_id) => {
        let query = "UPDATE User_OTP SET expires_at = now() WHERE ";
        query += "user_id = ?;";

        await db.query(query, user_id);
    },

    verifyEmail: async (user_id) => {
        let query = "UPDATE User SET verified_email = 1 WHERE user_id = ?;";

        await db.query(query, user_id);
    },

    verifyPhone: async (user_id) => {
        let query = "UPDATE User SET verified_phone = 1 WHERE user_id = ?;";

        await db.query(query, user_id);
    },

    getAdmin: async (user_id) => {
        let query = "SELECT * FROM Admins WHERE user_id = ?;";

        const [admins] = await db.query(query, user_id);

        return admins;
    },

    setCriticalError: async (location, id, name) => {
        let query = "INSERT INTO Errors (location, error_id, error_name) ";
        query += "VALUES (?, ?, ?);";

        if (MODE == "DEVELOPMENT") {
            console.log("\n\n\nIN DEVELOPMENT\n\n\n");
            return
        }

        try {
            await db.query(query, [location, id, name]);

            const { returnData, error } = await resend.emails.send({
                from: 'web-contact@gurparkashsingh.com',
                to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
                subject: "Taqdeer Website Error",
                text: `Unexpected error occured\nError: ${name}`,
            });

            console.log(error);
        } catch (queryError) {
            const { returnData, error } = await resend.emails.send({
                from: 'web-contact@gurparkashsingh.com',
                to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
                subject: "Taqdeer Website Error",
                text: `Error while saving\nError: ${queryError.message}`,
            });
            console.log(queryError);

            if (error) {
                console.log("Resend failed");
                console.log(error);
            }
        }
    },

    setError: async (location, id, name) => {
        let query = "INSERT INTO Errors (location, error_id, error_name) ";
        query += "VALUES (?, ?, ?);";

        try {
            console.log(location, id, name);
            await db.query(query, [location, id, name]);
        } catch (queryError) {
            const { returnData, error } = await resend.emails.send({
                from: 'web-contact@gurparkashsingh.com',
                to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
                subject: "Taqdeer Website Error",
                text: `Error while saving\nError: ${queryError.message}`,
            });
            console.log(queryError);

            if (error) {
                console.log("Resend failed");
                console.log(error);
            }
        }
    },

    getAdminPermissions: async (admin_id) => {
        let query = "SELECT * FROM Admin_Type_And_Permission WHERE admin_id = ?;";

        const [permissions] = await db.query(query, admin_id);

        return permissions;
    },

    setPhone: async (country, number, user_id) => {
        let query = "UPDATE User SET country = ?, telephone = ? WHERE ";
        query += "user_id = ?;";

        await db.query(query, [country, number, user_id]);
    },

    getCategoryByID: async (id) => {
        let query = "SELECT * FROM Category WHERE category_id = ?;";

        const [categories] = await db.query(query, id);

        return categories;
    },

    getProductsByCategory: async (category) => {
        let query = "SELECT * FROM Products WHERE category_id = ?;";

        const [products] = await db.query(query, category);

        return products;
    },

    deleteCategory: async (id) => {
        let query = "DELETE FROM Category WHERE category_id = ?;";

        await db.query(query, id);
    },

    addCategory: async (name) => {
        let query = "INSERT INTO Category (category_name) VALUES (?);";

        await db.query(query, name);
    },

    updateCategory: async (id, name) => {
        let query = "UPDATE Category SET category_name = ? WHERE ";
        query += "category_id = ?;";

        await db.query(query, [name, id]);
    },

    getCollectionByID: async (id) => {
        let query = "SELECT * FROM Collections WHERE collection_id = ?;";

        const [categories] = await db.query(query, id);

        return categories;
    },

    getProductsByCollection: async (collection) => {
        let query = "SELECT * FROM Products WHERE collection_id = ?;";

        const [products] = await db.query(query, collection);

        return products;
    },

    deleteCollection: async (id) => {
        let query = "DELETE FROM Collections WHERE collection_id = ?;";

        await db.query(query, id);
    },

    addCollection: async (name) => {
        let query = "INSERT INTO Collections (collection_name) VALUES (?);";

        await db.query(query, name);
    },

    updateCollection: async (id, name) => {
        let query = "UPDATE Collections SET collection_name = ? WHERE ";
        query += "collection_id = ?;";

        await db.query(query, [name, id]);
    },

    getAdminPermissionsByPermissionID: async (admin_id, permission_id) => {
        let query = "SELECT * FROM Admin_Type_And_Permission WHERE admin_id = ? ";
        query += "AND permission_id = ?"

        const [permissions] = await db.query(query, [admin_id, permission_id]);

        return permissions;
    },
}