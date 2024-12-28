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
        let query = "SELECT * FROM Users WHERE Email = ?";

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
        let query = "SELECT * FROM Images WHERE product_id = ?;";

        const [images] = await db.query(query, product_id);

        return images;
    },

    getProductSizes: async (product_id) => {
        let query = "SELECT * FROM Sizes_Available WHERE product_id = ?;";

        const [sizes] = await db.query(query, product_id);

        return sizes;
    }
}