import mysql from "mysql2";
import { DATABASE_URL } from "$env/static/private";

export const db = mysql.createPool(DATABASE_URL).promise();

export const dbFunctions = {
    getCategories: async () => {
        const [result] = await db.query("SELECT category_id, category_name FROM Category;");

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
        let query = "SELECT * FROM Products ORDER BY Price ";

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
        let query = "SELECT * FROM Products WHERE product_id = ?;";

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
        query += "Products.name, Products.description, price, Products.discount_id, ";
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
    }
}