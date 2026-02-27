import mysql from 'mysql2';
import { DATABASE_PASS, MODE, OFFLINE } from '$env/static/private';
import { RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';
import { error } from '@sveltejs/kit';

const resend = new Resend(RESEND_API_KEY);

export let db;
try {
	if (MODE == 'DEVELOPMENT' && OFFLINE == 'TRUE') {
		db = mysql
			.createPool({
				host: 'localhost',
				user: 'root',
				database: 'Taqdeer',
				timezone: 'Z'
			})
			.promise();
	} else if (MODE == 'DEVELOPMENT') {
		db = mysql
			.createPool({
				host: '192.168.2.25',
				user: 'gurp',
				password: DATABASE_PASS,
				database: 'Taqdeer_Development',
				timezone: 'Z'
			})
			.promise();
	} else {
		db = mysql
			.createPool({
				host: 'localhost',
				user: 'gurp',
				password: DATABASE_PASS,
				database: 'Taqdeer',
				timezone: 'Z'
			})
			.promise();
	}
} catch (dbError) {
	if (MODE != 'DEVELOPMENT') {
		const { returnData, error } = await resend.emails.send({
			from: 'web-contact@gurparkashsingh.com',
			to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
			subject: 'Taqdeer Website Error',
			text: `cannot connect to database\nError: ${dbError.code}`
		});
	}
}

export const dbFunctions = {
	getCategories: async () => {
		let query = 'SELECT category_id, category_name FROM Category;';

		const [result] = await db.query(query);

		return result;
	},

	getLiveCollections: async () => {
		const [result] = await db.query(
			'SELECT collection_id, collection_name FROM Collections WHERE live = 1;'
		);

		return result;
	},

	getCollections: async () => {
		const [result] = await db.query(
			'SELECT collection_id, collection_name, live FROM Collections;'
		);

		return result;
	},

	getUserByEmail: async (email) => {
		let query = 'SELECT * FROM User WHERE Email = ?';

		const [users] = await db.query(query, email);

		if (users.length > 0) {
			return users[0];
		}

		return;
	},

	getProducts: async (sort_asc = true, limit = 0, offset = 0) => {
		let query = 'SELECT P.* FROM Products AS P ';
		query += 'LEFT JOIN Collections ON P.collection_id = Collections.collection_id ';
		query += 'WHERE P.live = 1 AND Collections.live = 1 ';
		query += 'ORDER BY default_price ';

		if (sort_asc == true) {
			query += 'ASC';
		} else {
			query += 'DESC';
		}

		if (limit > 0) {
			query += ` LIMIT ${limit}`;
		}

		if (offset > 0) {
			query += ` OFFSET ${offset}`;
		}

		query += ';';

		const [products] = await db.query(query);

		return products;
	},

	getProductById: async (id) => {
		let query = 'SELECT P.* FROM Products AS P ';
		query += 'LEFT JOIN Collections ON P.collection_id = Collections.collection_id ';
		query += 'WHERE product_id = ? AND P.live = 1 AND Collections.live = 1;';

		const [products] = await db.query(query, id);

		return products;
	},

	getItemById: async (id) => {
		let query = 'SELECT * FROM Product_Item WHERE item_id = ?;';

		const [result] = await db.query(query, id);

		return result;
	},

	getMainImages: async () => {
		let query = 'SELECT * FROM Images WHERE main_image = 1;';

		const [images] = await db.query(query);

		return images;
	},

	getImagesByProductId: async (product_id) => {
		let query = 'SELECT * FROM Images WHERE product_id = ? ';
		query += 'ORDER BY -display_order DESC;';

		const [images] = await db.query(query, product_id);

		return images;
	},

	getProductOutOfStock: async (product_id) => {
		let query = 'SELECT SUM(quantity) AS total_quantity ';
		query += 'FROM Product_Item WHERE product_id = ?;';

		const [[result]] = await db.query(query, product_id);

		if (result.total_quantity === '0') {
			return true;
		}
		return false;
	},

	getProductVariations: async (product_id) => {
		let query = 'SELECT product_id, ';
		query += 'Product_Variations.variation_id AS id, name ';
		query += 'FROM Product_Variations ';
		query += 'JOIN Variations ON ';
		query += 'Variations.variation_id = Product_Variations.variation_id ';
		query += 'WHERE product_id = ? ';
		query += 'ORDER BY id ASC;';

		const [result] = await db.query(query, product_id);

		return result;
	},

	getProductVariationOptions: async (product_id) => {
		let query = 'SELECT VO.option_id, VO.variation_id, VO.value ';
		query += 'FROM Product_Variation_Options ';
		query += 'JOIN Variation_Options AS VO ON ';
		query += 'VO.option_id = Product_Variation_Options.option_id ';
		query += 'WHERE product_id = ?;';

		const [result] = await db.query(query, product_id);

		return result;
	},

	getProductItems: async (product_id) => {
		let query = 'SELECT items.*, ';
		query += '(';
		query += 'SELECT JSON_OBJECTAGG(Variation_Options.variation_id, ';
		query += 'Variation_Options.option_id) ';
		query += 'FROM Product_Configuration ';
		query += 'JOIN Variation_Options ON ';
		query += 'Product_Configuration.variation_option = Variation_Options.option_id ';
		query += 'WHERE Product_Configuration.product_item = items.item_id';
		query += ') AS variations ';
		query += 'FROM Product_Item as items ';
		query += 'WHERE product_id = ?;';

		const [result] = await db.query(query, product_id);

		return result;
	},

	getShoppingSessionByToken: async (token) => {
		let query = 'SELECT * FROM Shopping_Session WHERE token = ?;';

		const [session] = await db.query(query, token);

		return session;
	},

	createNewShoppingSession: async (token) => {
		let query = 'INSERT INTO Shopping_Session (token) VALUES (?);';

		await db.query(query, token);
	},

	checkCartForProduct: async (session_id, item_id) => {
		let query = 'SELECT * FROM Cart_Items ';
		query += 'WHERE session_id = ? AND item_id = ?;';

		const [items] = await db.query(query, [session_id, item_id]);

		return items;
	},

	addToCart: async (id, item_id, quantity) => {
		let query = 'INSERT INTO Cart_Items ';
		query += '(session_id, item_id, quantity) ';
		query += 'VALUES (?, ?, ?);';

		await db.query(query, [id, item_id, quantity]);
	},

	updateCart: async (id, item_id, quantity) => {
		let query = 'UPDATE Cart_Items SET quantity = ? ';
		query += 'WHERE session_id = ? AND item_id = ?;';

		await db.query(query, [quantity, id, item_id]);
	},

	removeFromCart: async (id, item_id) => {
		let query = 'DELETE FROM Cart_Items ';
		query += 'WHERE session_id = ? AND item_id = ?;';

		await db.query(query, [id, item_id]);
	},

	getTotalCartQuantity: async (id) => {
		let query = 'SELECT SUM(quantity) AS quantity ';
		query += 'FROM Cart_Items WHERE session_id = ?;';

		const [result] = await db.query(query, id);

		return result;
	},

	getItemsForCurrentSession: async (id) => {
		let query = 'SELECT name, CI.*, PI.price, PI.sku, Images.*, PI.weight, ';
        query += "default_box_volume, ";
		query += '(';
		query += 'SELECT JSON_OBJECTAGG( ';
		query += 'Variations.name, Variation_Options.value) ';
		query += 'FROM Product_Configuration ';
		query += 'JOIN Variation_Options ON ';
		query += 'Product_Configuration.variation_option = ';
		query += 'Variation_Options.option_id ';
		query += 'JOIN Variations ON ';
		query += 'Variation_Options.variation_id = Variations.variation_id ';
		query += 'WHERE Product_Configuration.product_item = PI.item_id';
		query += ') AS variations ';
		query += 'FROM Cart_Items AS CI ';
		query += 'JOIN Product_Item AS PI ON CI.item_id = PI.item_id ';
		query += 'JOIN Products ON PI.product_id = Products.product_id ';
		query += 'JOIN Images ON Images.product_id = Products.product_id ';
		query += 'WHERE session_id = ? AND main_image = 1;';

		const [items] = await db.query(query, id);

		return items;
	},

	getMessages: async () => {
		let query = 'SELECT * FROM Messages WHERE broadcast = 1;';

		const [messages] = await db.query(query);

		return messages;
	},

	getProductComponents: async (id) => {
		let query = 'SELECT * FROM Components WHERE product_id = ?;';

		const [components] = await db.query(query, id);

		return components;
	},

	getComponentProperties: async (id) => {
		let query = 'SELECT Components.component_id, component_name, ';
		query += 'property_name, property_value, ';
		query += 'Component_Properties.property_id ';
		query += 'FROM Components ';
		query += 'JOIN Component_Properties ON ';
		query += 'Components.component_id ';
		query += '= Component_Properties.component_id ';
		query += 'WHERE Components.product_id = ? ';
		query += 'ORDER BY Components.component_id;';

		const [properties] = await db.query(query, id);

		return properties;
	},

	createUser: async (email, pass, name, tap_id) => {
		let query = 'INSERT INTO User (email, password, name, tap_customer_id) ';
		query += 'VALUES (?, ?, ?, ?);';

		await db.query(query, [email, pass, name, tap_id]);

		query = 'SELECT * FROM User WHERE email = ?;';

		const [users] = await db.query(query, email);

		if (users.length > 0) {
			return users;
		}

		return;
	},

	storeAuth: async (session, id) => {
		let query = 'INSERT INTO User_Tokens (user_id, token, expires_at) ';
		query += 'VALUES (?, ?, now()+interval 1 day);';

		await db.query(query, [id, session]);
	},

	removeAuth: async (session) => {
		let query = 'UPDATE User_Tokens SET expires_at = now() ';
		query += 'WHERE token = ?;';

		await db.query(query, session);
	},

	storeToken: async (session, id) => {
		let query = 'INSERT INTO User_Tokens (user_id, token, expires_at) ';
		query += 'VALUES (?, ?, now()+interval 15 minute);';

		await db.query(query, [id, session]);
	},

	getUserByAuthToken: async (session) => {
		let query = 'SELECT * FROM User_Tokens WHERE token = ? ';
		query += 'AND expires_at > now();';

		const [users] = await db.query(query, session);

		if (users.length > 0) {
			return users;
		}

		return;
	},

	getUserByID: async (id) => {
		let query = 'SELECT * FROM User WHERE user_id = ?;';

		const [user] = await db.query(query, id);

		return user;
	},

	updateEmail: async (newEmail, email) => {
		let query = 'UPDATE User SET email = ?, verified_email = 0 ';
		query += 'WHERE email = ?;';

		await db.query(query, [newEmail, email]);
	},

	updateName: async (name, email) => {
		let query = 'UPDATE User SET name = ? WHERE email = ?;';

		await db.query(query, [name, email]);
	},

	updateDOB: async (date_of_birth, email) => {
		let query = 'UPDATE User SET date_of_birth = ? WHERE email = ?;';

		await db.query(query, [date_of_birth, email]);
	},

	updatePassword: async (password, email) => {
		let query = 'UPDATE User SET password = ? WHERE email = ?;';

		await db.query(query, [password, email]);
	},

	expireToken: async (token_id) => {
		let query = 'UPDATE User_Tokens SET expires_at = now() WHERE ';
		query += 'id = ?;';

		await db.query(query, token_id);
	},

	createOTP: async (session, id, service) => {
		let query = 'INSERT INTO User_OTP (user_id, token, service, expires_at) ';
		query += 'VALUES (?, ?, ?, now()+interval 5 minute);';

		await db.query(query, [id, session, service]);
	},

	getPreviousOTP: async (user_id) => {
		let query = 'SELECT * FROM User_OTP WHERE user_id = ? ';
		query += 'AND created_at > now() - interval 1 minute;';

		const [tokens] = await db.query(query, user_id);

		return tokens;
	},

	getOTP: async (otp) => {
		let query = 'SELECT * FROM User_OTP WHERE token = ? ';
		query += 'AND expires_at > now();';

		const [tokens] = await db.query(query, otp);

		return tokens;
	},

	expireOTP: async (user_id) => {
		let query = 'UPDATE User_OTP SET expires_at = now() WHERE ';
		query += 'user_id = ?;';

		await db.query(query, user_id);
	},

	verifyEmail: async (user_id) => {
		let query = 'UPDATE User SET verified_email = 1 WHERE user_id = ?;';

		await db.query(query, user_id);
	},

	verifyPhone: async (user_id) => {
		let query = 'UPDATE User SET verified_phone = 1 WHERE user_id = ?;';

		await db.query(query, user_id);
	},

	getAdmin: async (user_id) => {
		let query = 'SELECT * FROM Admins WHERE user_id = ?;';

		const [admins] = await db.query(query, user_id);

		return admins;
	},

	setCriticalError: async (location, id, name) => {
		let query = 'INSERT INTO Errors (location, error_id, error_name) ';
		query += 'VALUES (?, ?, ?);';

		if (MODE == 'DEVELOPMENT') {
			return;
		}

		try {
			await db.query(query, [location, id, name]);

			const { returnData, error } = await resend.emails.send({
				from: 'web-contact@gurparkashsingh.com',
				to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
				subject: 'Taqdeer Website Error',
				text: `Unexpected error occured\nError: ${name}`
			});
		} catch (queryError) {
			const { returnData, error } = await resend.emails.send({
				from: 'web-contact@gurparkashsingh.com',
				to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
				subject: 'Taqdeer Website Error',
				text: `Error while saving\nError: ${queryError.message}`
			});
			console.log(queryError);

			if (error) {
				console.log('Resend failed');
				console.log(error);
			}
		}
	},

	setError: async (location, id, name) => {
		let query = 'INSERT INTO Errors (location, error_id, error_name) ';
		query += 'VALUES (?, ?, ?);';

		try {
			console.log(location, id, name);
			await db.query(query, [location, id, name]);
		} catch (queryError) {
			const { returnData, error } = await resend.emails.send({
				from: 'web-contact@gurparkashsingh.com',
				to: ['khalsags.fateh@gmail.com', 'sandee.ceo@gmail.com'],
				subject: 'Taqdeer Website Error',
				text: `Error while saving\nError: ${queryError.message}`
			});
			console.log(queryError);

			if (error) {
				console.log('Resend failed');
				console.log(error);
			}
		}
	},

	getAdminPermissions: async (admin_id) => {
		let query = 'SELECT * FROM Admin_Type_And_Permission ';
		query += 'WHERE admin_id = ?;';

		const [permissions] = await db.query(query, admin_id);

		return permissions;
	},

	getAdminPermissionsByParentName: async (admin_id, name) => {
		let query = 'SELECT * FROM Admin_Type_And_Permission ';
		query += 'WHERE admin_id = ? AND ';
		query += 'parent_permission_name = ?;';

		const [permissions] = await db.query(query, [admin_id, name]);

		return permissions;
	},

	getAdminPermissionsByName: async (admin_id, name) => {
		let query = 'SELECT * FROM Admin_Type_And_Permission ';
		query += 'WHERE admin_id = ? AND name = ?;';

		const [permissions] = await db.query(query, [admin_id, name]);

		return permissions;
	},

	setPhone: async (country, number, user_id) => {
		let query = 'UPDATE User SET country = ?, telephone = ?, ';
		query += 'verified_phone = 0 ';
		query += 'WHERE user_id = ?;';

		await db.query(query, [country, number, user_id]);
	},

	getCategoryByID: async (id) => {
		let query = 'SELECT * FROM Category WHERE category_id = ?;';

		const [categories] = await db.query(query, id);

		return categories;
	},

	getProductsByCategory: async (category) => {
		let query = 'SELECT * FROM Products WHERE category_id = ?;';

		const [products] = await db.query(query, category);

		return products;
	},

	deleteCategory: async (id) => {
		let query = 'DELETE FROM Category WHERE category_id = ?;';

		await db.query(query, id);
	},

	addCategory: async (name) => {
		let query = 'INSERT INTO Category (category_name) VALUES (?);';

		await db.query(query, name);
	},

	updateCategory: async (id, name) => {
		let query = 'UPDATE Category SET category_name = ? WHERE ';
		query += 'category_id = ?;';

		await db.query(query, [name, id]);
	},

	getCollectionByID: async (id) => {
		let query = 'SELECT * FROM Collections WHERE collection_id = ?;';

		const [categories] = await db.query(query, id);

		return categories;
	},

	getProductsByCollection: async (collection) => {
		let query = 'SELECT * FROM Products WHERE collection_id = ?;';

		const [products] = await db.query(query, collection);

		return products;
	},

	deleteCollection: async (id) => {
		let query = 'DELETE FROM Collections WHERE collection_id = ?;';

		await db.query(query, id);
	},

	addCollection: async (name) => {
		let query = 'INSERT INTO Collections (collection_name) VALUES (?);';

		await db.query(query, name);
	},

	updateCollection: async (id, name, live) => {
		let query = 'UPDATE Collections SET collection_name = ? ';
		if (live) {
			query += ', live = 1 ';
		} else {
			query += ', live = 0 ';
		}
		query += 'WHERE collection_id = ?;';

		await db.query(query, [name, id]);
	},

	getAdminPermissionsByPermissionID: async (admin_id, permission_id) => {
		let query = 'SELECT * FROM Admin_Type_And_Permission WHERE admin_id = ? ';
		query += 'AND permission_id = ?';

		const [permissions] = await db.query(query, [admin_id, permission_id]);

		return permissions;
	},

	getAllProducts: async (sort_asc = true, limit = 0, offset = 0) => {
		let query = 'SELECT * FROM Products ORDER BY default_price ';

		if (sort_asc == true) {
			query += 'ASC';
		} else {
			query += 'DESC';
		}

		if (limit > 0) {
			query += ` LIMIT ${limit}`;
		}

		if (offset > 0) {
			query += ` OFFSET ${offset}`;
		}

		query += ';';

		const [products] = await db.query(query);

		return products;
	},

	getAnyProductById: async (id) => {
		let query = 'SELECT * FROM Products WHERE product_id = ?;';

		const [products] = await db.query(query, id);

		return products;
	},

	updateProductName: async (id, value) => {
		let query = 'UPDATE Products SET name = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);
	},

	updateProductCategory: async (id, value) => {
		let query = 'UPDATE Products SET category_id = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);
	},

	updateProductCollection: async (id, value) => {
		let query = 'UPDATE Products SET collection_id = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);
	},

	updateProductPrice: async (id, value) => {
		let query = 'UPDATE Products SET default_price = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);

        query = "UPDATE Product_Item SET price = ? WHERE product_id = ?;";

        await db.query(query, [value, id]);
	},

	updateProductLive: async (id, value) => {
		let query = 'UPDATE Products SET live = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);
	},

	updateProductDescription: async (id, value) => {
		let query = 'UPDATE Products SET description = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);
	},

	updateProductImageDesc: async (id, value) => {
		let query = 'UPDATE Products SET image_alt_desc = ? WHERE product_id = ?;';

		await db.query(query, [value, id]);
	},

	getAvailableCurrencies: async () => {
		let query = 'SELECT currency_code FROM Available_Currencies';

		const [result] = await db.query(query);

		return result;
	},

	removeAllFromCart: async (session) => {
		let query = 'DELETE FROM Cart_Items WHERE session_id = ? ';
		query += 'AND item_id > 0';

		await db.query(query, session);
	},

	createOrderForExistingUser: async (user_id, name, email, country, phone) => {
		let query = 'INSERT INTO Orders ';
		query += '(user_id, name, user_email, country, telephone, status) VALUES ';
		query += '(?, ?, ?, ?, ?, 1);';

		const [result] = await db.query(query, [user_id, name, email, country, phone]);

		return result;
	},

	createOrderForGuest: async (name, email, country, phone) => {
		let query = 'INSERT INTO Orders ';
		query += '(name, user_email, country, telephone, status) VALUES ';
		query += '(?, ?, ?, ?, 1);';

		const [result] = await db.query(query, [name, email, country, phone]);

		return result;
	},

	setAddress: async (line1, line2, city, province, postal_code, country) => {
		let query = 'SELECT address_id FROM Addresses WHERE ';
		query += 'address_line1 = ? AND address_line2 = ? AND city = ? ';
		query += 'AND province = ? AND postal_code = ? AND country = ?;';

		let [[result]] = await db.query(query, [line1, line2, city, province, postal_code, country]);

		if (result) {
			return result;
		}

		query = 'INSERT INTO Addresses ';
		query += '(address_line1, address_line2, city, ';
		query += 'province, postal_code, country) ';
		query += 'VALUES (?, ?, ?, ?, ?, ?);';

		[result] = await db.query(query, [line1, line2, city, province, postal_code, country]);

		return { address_id: result.insertId };
	},

	setOrderAddress: async (
		order_id,
		line1,
		line2,
		city,
		province,
		postal_code,
		country,
		user_address_id
	) => {
		let address_id = user_address_id;

		if (!(address_id > 0)) {
			user_address_id = null;
		}

		if (!user_address_id) {
			const result = await dbFunctions.setAddress(
				line1,
				line2,
				city,
				province,
				postal_code,
				country
			);

			address_id = result.address_id;
		}

		let query = 'UPDATE Orders SET order_address = ?, status = 2 WHERE id = ?';

		await db.query(query, [address_id, order_id]);
	},

	updateOrderAddress: async (
		order_id,
		line1,
		line2,
		city,
		province,
		postal_code,
		country,
		user_address_id
	) => {
		let address_id = user_address_id;

		if (!(address_id > 0)) {
			address_id = null;
		}

		if (!user_address_id) {
			const result = await dbFunctions.setAddress(
				line1,
				line2,
				city,
				province,
				postal_code,
				country
			);

			address_id = result.address_id;
		}

		let query = 'UPDATE Orders SET order_address = ? WHERE id = ?';

		await db.query(query, [address_id, order_id]);
	},

	getOrderById: async (id) => {
		let query = 'SELECT * FROM Orders WHERE id = ?';

		const [order] = await db.query(query, id);

		return order;
	},

	updateOrder: async (id, name, email, country, phone) => {
		let query = 'UPDATE Orders ';
		query += 'SET name = ?, user_email = ?, country = ?, telephone = ? WHERE ';
		query += 'id = ?;';

		const [result] = await db.query(query, [name, email, country, phone, id]);

		return result;
	},

	getOrderAddress: async (address_id) => {
		let query = 'SELECT * FROM Addresses WHERE address_id = ?;';

		if (!address_id) {
			return [];
		}

		const [result] = await db.query(query, address_id);

		return result;
	},

	updateInvalidCart: async (session_id) => {
		let query = 'DELETE FROM Cart_Items WHERE (quantity > ( ';
		query += 'SELECT quantity FROM Product_Item ';
		query += 'WHERE item_id = Cart_Items.item_id ';
		query += ') OR quantity > 5) ';
		query += 'AND session_id = ?;';

		const [result] = await db.query(query, session_id);

		return result.affectedRows > 0;
	},

	moveItemsToOrder: async (order_id, session_id) => {
		let query = 'UPDATE Product_Item JOIN Cart_Items ';
		query += 'ON Product_Item.item_id = Cart_Items.item_id ';
		query += 'SET Product_Item.quantity = ';
		query += 'Product_Item.quantity - Cart_Items.quantity ';
		query += 'WHERE Cart_Items.session_id = ?;';
		await db.query(query, session_id);

		query = 'INSERT INTO Order_Items (order_id, item_id, quantity) ';
		query += 'SELECT ? AS order_id, item_id, quantity ';
		query += 'FROM Cart_Items WHERE session_id = ?;';
		await db.query(query, [order_id, session_id]);

		query = 'UPDATE Orders SET status = 3 WHERE id = ?;';
		await db.query(query, order_id);
	},

	createOrderInvoiceItem: async (order_id, amount, name) => {
		let query = 'INSERT INTO Order_Invoice_Items (order_id, amount, name) ';
		query += 'VALUES (?, ?, ?);';

		await db.query(query, [order_id, amount, name]);

		query = 'UPDATE Orders SET status = 4 WHERE id = ?;';
		await db.query(query, order_id);
	},

	getUserAddresses: async (user_id) => {
		let query = 'SELECT User.id, User.address_name, User.user_id, Addresses.* ';
		query += 'FROM User_Addresses AS User ';
		query += 'JOIN Addresses ON Addresses.address_id = User.address_id ';
		query += 'WHERE user_id = ?;';

		const [result] = await db.query(query, user_id);

		return result;
	},

	setUserAddress: async (user_id, name, line1, line2, city, province, postal_code, country) => {
		let result = await dbFunctions.setAddress(line1, line2, city, province, postal_code, country);

		const address_id = result.address_id;

		let query = 'INSERT INTO User_Addresses ';
		query += '(user_id, address_name, address_id) ';
		query += 'VALUES (?, ?, ?)';

		[result] = await db.query(query, [user_id, name, address_id]);

		return address_id;
	},

	updateUserAddress: async (
		id,
		user_id,
		name,
		line1,
		line2,
		city,
		province,
		postal_code,
		country
	) => {
		let query = 'DELETE FROM User_Addresses WHERE id = ?;';

		await db.query(query, id);

		await dbFunctions.setUserAddress(
			user_id,
			name,
			line1,
			line2,
			city,
			province,
			postal_code,
			country
		);
	},

	deleteUserAddress: async (id) => {
		let query = 'DELETE FROM User_Addresses WHERE id = ?;';

		await db.query(query, id);
	},

	getUserCards: async (user_id) => {
		let query = 'SELECT * FROM User_Cards WHERE user_id = ?;';

		const [result] = await db.query(query, user_id);

		return result;
	},

	getOrderItems: async (id) => {
		let query = 'SELECT name, OI.*, PI.price, PI.sku, Images.*, ';
		query += 'PI.weight, default_box_volume, ';
		query += '(';
		query += 'SELECT JSON_OBJECTAGG';
		query += '(Variations.name, Variation_Options.value) ';
		query += 'FROM Product_Configuration ';
		query += 'JOIN Variation_Options ON ';
		query += 'Product_Configuration.variation_option = ';
		query += 'Variation_Options.option_id ';
		query += 'JOIN Variations ON ';
		query += 'Variation_Options.variation_id = Variations.variation_id ';
		query += 'WHERE Product_Configuration.product_item = PI.item_id';
		query += ') AS variations ';
		query += 'FROM Order_Items AS OI ';
		query += 'JOIN Product_Item AS PI ON OI.item_id = PI.item_id ';
		query += 'JOIN Products ON PI.product_id = Products.product_id ';
		query += 'JOIN Images ON Images.product_id = Products.product_id ';
		query += 'WHERE order_id = ? AND main_image = 1;';

		const [items] = await db.query(query, id);

		return items;
	},

	addImage: async (product_id, link, alt_desc) => {
		let query = 'INSERT INTO Images (product_id, image_link, alt_desc) ';
		query += 'VALUES (?, ?, ?);';

		await db.query(query, [product_id, link, alt_desc]);
	},

	setMainImage: async (product_id, image_id) => {
		let query = 'UPDATE Images SET main_image = null WHERE product_id = ?;';

		await db.query(query, product_id);

		query = 'UPDATE Images SET main_image = 1 WHERE image_id = ?;';

		await db.query(query, image_id);
	},

	setAltDesc: async (product_id, alt_desc) => {
		let query = 'UPDATE Images SET alt_desc = ? WHERE product_id = ?;';

		await db.query(query, [alt_desc, product_id]);
	},

	getImage: async (image_id) => {
		let query = 'SELECT * FROM Images WHERE image_id = ?;';

		const [result] = await db.query(query, image_id);

		return result;
	},

	deleteImage: async (id) => {
		let query = 'DELETE FROM Images WHERE image_id = ?;';

		await db.query(query, id);
	},

	getOrderInvoice: async (order_id) => {
		let query = 'SELECT * FROM Order_Invoice_Items WHERE order_id = ?;';

		const [result] = await db.query(query, order_id);

		return result;
	},

	getOrderInvoiceWithoutDelivery: async (order_id) => {
		let query = 'SELECT * FROM Order_Invoice_Items WHERE order_id = ? ';
		query += "AND name <> 'delivery'";

		const [result] = await db.query(query, order_id);

		return result;
	},

	getOrderDelivery: async (order_id) => {
		let query = 'SELECT * FROM Order_Invoice_Items WHERE order_id = ? ';
		query += "AND name = 'delivery'";

		const [result] = await db.query(query, order_id);

		return result;
	},

	updateDeliveryRate: async (order_id, amount) => {
		let query = 'UPDATE Order_Invoice_Items SET ';
		query += "amount = ? WHERE order_id = ? AND name = 'delivery';";

		await db.query(query, [amount, order_id]);
	},

	getOrderInvoiceTotal: async (order_id) => {
		let query = 'SELECT sum(amount) as total FROM Order_Invoice_Items ';
		query += 'WHERE order_id = ?;';

		const [result] = await db.query(query, order_id);

		return result;
	},

	getUserAddressById: async (id) => {
		let query = 'SELECT * FROM Addresses WHERE address_id = ?;';

		const [result] = await db.query(query, id);

		return result;
	},

	getUserOrders: async (id) => {
		let query = 'SELECT * FROM Orders WHERE user_id = ? AND status > 5;';

		const [result] = await db.query(query, id);

		return result;
	},

	saveTapDetails: async (order_id, tap_id, tap_order_id, receipt, payment_id) => {
		let query = 'UPDATE Orders SET tap_charge_id = ?, ';
		query += 'tap_order_id = ?, tap_receipt = ?, payment_id = ?, ';
		query += 'status = 7 WHERE id = ?;';

		await db.query(query, [tap_id, tap_order_id, receipt, payment_id, order_id]);
	},

	addAramexShipmentId: async (order_id, tracking_id) => {
		let query = 'UPDATE Orders SET tracking_id = ? WHERE id = ?;';

		await db.query(query, [tracking_id, order_id]);
	},

	saveTapCustomer: async (tap_id, user_id) => {
		let query = 'UPDATE User SET tap_customer_id = ? ';
		query += 'WHERE user_id = ?;';

		await db.query(query, [tap_id, user_id]);
	},

	getCardById: async (card_id) => {
		let query = 'SELECT * FROM User_Cards WHERE card_id = ?;';

		const [result] = await db.query(query, card_id);

		return result;
	},

	deleteCard: async (card_id) => {
		let query = 'DELETE FROM User_Cards WHERE card_id = ?;';

		await db.query(query, card_id);
	},

	addPaymentDetails: async (amount, provider, status) => {
		let query = 'INSERT INTO Payment_Details (amount, provider, status) ';
		query += 'VALUES (?,?,?);';

		const [result] = await db.query(query, [amount, provider, status]);

		return result;
	},

	getUserOrdersAndPaymentDetails: async (id) => {
		let query = 'SELECT Orders.id, Orders.tap_receipt, ';
		query += 'Payment_Details.created_at FROM Orders ';
		query += 'LEFT JOIN Payment_Details ON ';
		query += 'Orders.payment_id = Payment_Details.payment_id ';
		query += 'WHERE user_id = ? AND Orders.status > 6;';

		const [result] = await db.query(query, id);

		return result;
	},

	getAllOrdersAndPaymentDetails: async () => {
		let query = 'SELECT Orders.id, Orders.tap_receipt, Orders.name, ';
		query += 'Orders.user_email, Orders.created_at, Order_Status.name AS status, ';
		query += 'Payment_Details.created_at AS payment_date FROM Orders ';
		query += 'JOIN Order_Status ON Order_Status.status_id = Orders.status ';
		query += 'LEFT JOIN Payment_Details ON ';
		query += 'Orders.payment_id = Payment_Details.payment_id ';

		const [result] = await db.query(query);

		return result;
	},

	setOrderToPending: async (order_id) => {
		let query = 'UPDATE Orders SET status = 5, modified_at = now() ';
		query += 'WHERE id = ?;';
		await db.query(query, order_id);
	},

	cancelOrder: async (order_id) => {
		let query = 'UPDATE Orders SET status = 6 WHERE id = ?;';
		await db.query(query, order_id);

		query = 'UPDATE Product_Item JOIN Order_Items ';
		query += 'ON Product_Item.item_id = Order_Items.item_id ';
		query += 'SET Product_Item.quantity = ';
		query += 'Product_Item.quantity + Order_Items.quantity ';
		query += 'WHERE Order_Items.order_id = ?;';
		await db.query(query, order_id);
	},

	getComponentById: async (id) => {
		let query = 'SELECT * FROM Components WHERE component_id = ?;';

		const [result] = await db.query(query, id);

		return result;
	},

	addComponent: async (product_id, component_name, description) => {
		let query = 'INSERT INTO Components (product_id, component_name, ';
		query += 'component_description) VALUES (?, ?, ?);';

		await db.query(query, [product_id, component_name, description]);
	},

	updateComponent: async (id, component_name, description) => {
		let query = 'UPDATE Components SET component_name = ?, ';
		query += 'component_description = ? WHERE component_id = ?;';

		await db.query(query, [component_name, description, id]);
	},

	deleteComponent: async (id) => {
		let query = 'DELETE FROM Components WHERE component_id = ?;';

		await db.query(query, id);
	},

	getPropertyById: async (id) => {
		let query = 'SELECT * FROM Component_Properties WHERE property_id = ?;';

		const [result] = await db.query(query, id);

		return result;
	},

	addProperty: async (component_id, name, value) => {
		let query = 'INSERT INTO Component_Properties (component_id, ';
		query += 'property_name, property_value) VALUES (?, ?, ?);';

		await db.query(query, [component_id, name, value]);
	},

	updateProperty: async (id, name, value) => {
		let query = 'UPDATE Component_Properties SET property_name = ?, ';
		query += 'property_value = ? WHERE property_id = ?;';

		await db.query(query, [name, value, id]);
	},

	deleteProperty: async (id) => {
		let query = 'DELETE FROM Component_Properties WHERE property_id = ?;';

		await db.query(query, id);
	},

	getPropertiesByComponentId: async (id) => {
		let query = 'SELECT * FROM Component_Properties WHERE ';
		query += 'component_id = ?;';

		const [result] = await db.query(query, id);

		return result;
	},

	createProduct: async (name, category, collection, price, alt_desc, description) => {
		let query = 'INSERT INTO Products (name, category_id, ';
		query += 'collection_id, default_price, image_alt_desc, ';
		query += 'description, live) ';
		query += 'VALUES (?, ?, ?, ?, ?, ?, 0);';

		const [result] = await db.query(query, [
			name,
			category,
			collection,
			price,
			alt_desc,
			description
		]);

		return result;
	},

	saveContactForm: async (email, message) => {
		let query = 'INSERT INTO Contact_Form_Emails ';
		query += '(email, message) VALUES (?, ?)';

		await db.query(query, [email, message]);
	},

	earlyAccess: async (email) => {
		let query = 'SELECT * FROM Early_Access ';
		query += 'WHERE email = ?;';

		const [[result]] = await db.query(query, email);

		return result;
	},

	getSizeChartComponents: async (product_id) => {
		let query = 'SELECT ';
		query += 'product_id, Size_Chart_Components.component_id, ';
		query += 'name, description ';
		query += 'FROM Product_Size_Chart_Components ';
		query += 'JOIN Size_Chart_Components ON ';
		query += 'Product_Size_Chart_Components.component_id = ';
		query += 'Size_Chart_Components.component_id ';
		query += 'WHERE product_id = ? ';
		query += 'ORDER BY component_id;';

		const [result] = await db.query(query, product_id);

		return result;
	},

	getAvailableSizeChartComponents: async () => {
		let query = 'SELECT * FROM Size_Chart_Components;';

		const [result] = await db.query(query);

		return result;
	},

	getUnusedSizeChartComponents: async (product_id) => {
		let query = 'SELECT * FROM Size_Chart_Components ';
		query += 'WHERE component_id NOT IN (';
		query += 'SELECT component_id FROM Product_Size_Chart_Components ';
		query += 'WHERE product_id = 1';
		query += ');';

		const [result] = await db.query(query, product_id);

		return result;
	},

	getSizeChartValues: async (id) => {
		let query = 'SELECT SCV.*, VO.value AS size ';
		query += 'FROM Size_Chart_Values AS SCV ';
		query += 'JOIN Variation_Options AS VO ON ';
		query += 'VO.option_id = SCV.option_id ';
		query += 'WHERE product_id = ? ';
		query += 'ORDER BY VO.option_id ASC, component_id ASC;';

		const [result] = await db.query(query, id);

		return result;
	},

	addUnsubscribeToken: async (email, token) => {
		let query = 'INSERT INTO Email_Unsubscribe_Token ';
		query += '(email, token) VALUES (?, ?);';

		await db.query(query, [email, token]);
	},

	getEmailUnsubscribeToken: async (token) => {
		let query = 'SELECT * FROM Email_Unsubscribe_Token WHERE token = ?;';

		const [result] = await db.query(query, token);

		return result;
	},

	deleteUnsubscribeTokens: async (email) => {
		let query = 'DELETE FROM Email_Unsubscribe_Token WHERE email = ? AND id > 0;';

		await db.query(query, email);
	},

	getProductSizeOptions: async (product_id) => {
		let query = 'SELECT Variation_Options.option_id, ';
		query += 'Variation_Options.variation_id, value ';
		query += 'FROM Product_Variation_Options ';
		query += 'JOIN Variation_Options ON ';
		query += 'Product_Variation_Options.option_id = ';
		query += 'Variation_Options.option_id ';
		query += 'JOIN Variations ON ';
		query += 'Variations.variation_id = Variation_Options.variation_id ';
		query += "WHERE product_id = ? AND name = 'Size';";

		const [result] = await db.query(query, product_id);

		return result;
	},

	updateSizeChartText: async (product_id, above, below) => {
		let query = 'UPDATE Products SET size_chart_above_text = ?, ';
		query += 'size_chart_below_text = ? WHERE product_id = ?;';

		await db.query(query, [above, below, product_id]);
	},

	updateSizeChartValue: async (product_id, option_id, component_id, value) => {
		let query = 'INSERT INTO Size_Chart_Values ';
		query += '(product_id, option_id, component_id, value) ';
		query += 'VALUE (?, ?, ?, ?) ';
		query += 'ON DUPLICATE KEY UPDATE value = ?;';

		await db.query(query, [product_id, option_id, component_id, value, value]);
	},

	getAllFromEarlyAccess: async () => {
		let query = 'SELECT * FROM Early_Access;';

		const [result] = await db.query(query);

		return result;
	},

	emailListSignup: async (email) => {
		let query = 'INSERT INTO Email_List (email) VALUES (?);';

		await db.query(query, email);
	},

	getEmailListUser: async (email) => {
		let query = 'SELECT * FROM Email_List WHERE email = ?;';

		const [result] = await db.query(query, email);

		return result;
	},

	unsubscribe: async (email) => {
		let query = 'DELETE FROM Email_List WHERE email = ? AND id > 0;';

		await db.query(query, email);
	},

	updateImageDisplayOrder: async (image_id, product_id, order) => {
		let query = 'UPDATE Images SET display_order = ? ';
		query += 'WHERE image_id = ? AND product_id = ?;';

		await db.query(query, [order, image_id, product_id]);
	},

	addToEarlyAccess: async (email) => {
		let query = 'INSERT INTO Early_Access (email) VALUE (?) ';
		query += 'ON DUPLICATE KEY UPDATE email = ?;';

		await db.query(query, [email, email]);
	},

	deleteEarlyAccess: async (email) => {
		let query = 'DELETE FROM Early_Access WHERE email = ?;';

		await db.query(query, email);
	},

	cancelOldOrders: async () => {
		let query = 'UPDATE Orders ';
		query += 'JOIN Order_Items ON Order_Items.order_id = Orders.id ';
		query += 'JOIN Product_Item ON ';
		query += 'Product_Item.item_id = Order_Items.item_id ';
		query += 'SET ';
		query += 'Orders.status = 6, ';
		query += 'Product_Item.quantity = ';
		query += 'Product_Item.quantity + Order_Items.quantity ';
		query += 'WHERE Orders.id > 0 AND Orders.status < 6 ';
		query += 'AND Orders.modified_at < now() - interval 35 minute;';

		await db.query(query);
	},

	addSizeChartComponentToProduct: async (component_id, product_id) => {
		let query = 'INSERT INTO Product_Size_Chart_Components ';
		query += '(product_id, component_id) VALUE (?, ?) ';
		query += 'ON DUPLICATE KEY UPDATE component_id = ?;';

		await db.query(query, [product_id, component_id, component_id]);
	},

	removeSizeChartComponentFromProduct: async (component_id, product_id) => {
		let query = 'DELETE FROM Product_Size_Chart_Components ';
		query += 'WHERE product_id = ? AND component_id = ?;';

		await db.query(query, [product_id, component_id]);
	}
};
