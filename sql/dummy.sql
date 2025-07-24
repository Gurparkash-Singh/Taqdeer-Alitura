Insert Into Category (category_name)
VALUES
("Tops"),
("Bottoms"),
("Outerwear");


INSERT INTO Collections (collection_name, live)
VALUES
("Juthuur", 1);

INSERT INTO Permission_Types (name, description, parent_permission, readable, writeable)
VALUES
("products", "The ability to access product settings", null, 1, 1),
("orders", "The ability to access order related settings", null, 1, 1),
("users", "The ability to access user related settings", null, 1, 1),
("admins", "The ability to access admin related settings", null, 1, 1),
("product types", "The ability to add, update and delete product types", 1, 1, 1),
("product variations", "The ability to add, update and delete variations on a product type (ex add Size / Colour to Clothing", 5, 1, 1),
("variation options", "The ability to add, update and delete options for a variation (ex add XXL to Size", 6, 1, 1),
("update products", "The ability to add and update products", 1, 1, 1),
("components", "The ability to add, update and delete product components", 8, 1, 1),
("component properties", "The ability to add, update and delete properties for components", 9, 1, 1),
("collections", "The ability to see all collections and add, update and delete collections", 1, 1, 1),
("categories", "The ability to see all categories and add, update and delete categories", 1, 1, 1),
("discounts", "The ability to add, update and delete discounts", 1, 1, 1),
("product info", "The ability to update product info", 8, 1, 1),
("images", "The ability to add and delete product images and change main image", 8, 1, 1),
("product items", "The ability to update product items", 8, 1, 1),
("sizing info", "The ability to update sizing info for a product", 8, 1, 1),
("all orders", "The ability to see all orders and print labels", 2, 1, 1),
("create pickups", "The ability to create order pickups", 2, 1, 1),
("messages", "The ability to add, update and remove messages shown to users", 3, 1, 1),
("members", "The ability to add and remove members", 3, 1, 1),
("member types", "The ability to add, update and remove member types", 3, 1, 1),
("contact form emails", "The ability to read contact form emails", 3, 1, 0),
("email list", "The ability to add and remove users from the email list", 3, 1, 1),
("abandoned carts", "The ability to see abandoned carts", 3, 1, 0),
("admin types", "The ability to add, update and remove admin types", 4, 1, 1),
("update admins", "The ability to add and remove admins", 4, 1, 1),
("errors", "The ability to see the error log", 4, 1, 0);

INSERT INTO Admin_Type (admin_type)
VALUES
("Super Admin");

INSERT INTO Admin_Permissions (permission_id, type_id, allow_write)
VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1),
(6, 1, 1),
(7, 1, 1),
(8, 1, 1),
(9, 1, 0),
(10, 1, 0),
(11, 1, 0),
(12, 1, 1),
(13, 1, 1),
(14, 1, 1),
(15, 1, 0),
(16, 1, 1),
(17, 1, 0),
(18, 1, 1),
(19, 1, 1),
(20, 1, 0),
(21, 1, 0),
(22, 1, 1),
(23, 1, 1),
(24, 1, 1),
(25, 1, 0),
(26, 1, 1),
(27, 1, 0),
(28, 1, 1);

INSERT INTO Product_Type (name) VALUE ("Clothing");

INSERT INTO Product_Variations(type_id, name) VALUE (1, "Size");

INSERT INTO Variation_Option (variation_id, value) 
VALUES
(1, "S"),
(1, "M"),
(1, "L"),
(1, "XL");

INSERT INTO Products (type_id, name, default_price, category_id, collection_id, description, image_alt_desc)
VALUES
(1, "Juthuur Sweats", 459, 2, 1, "Elegant and heavy oversized sweats", "Elegant and heavy oversized sweats"),
(1, "Juthuur Hoodie", 511, 1, 1, "Heavyweight oversized hoodie in olivegreen", "Heavyweight oversized hoodie in olivegreen"),
(1, "Juthuur Dunes Tee", 324, 1, 1, "Black oversized shirts with breast and torso pockets", "Black oversized shirts with breast and torso pockets"),
(1, "Juthuur Sweatshirt", 432, 1, 1, "Heavyweight oversized sweatshirt in black", "Heavyweight oversized sweatshirt in black"),
(1, "Juthuur Tee", 324, 1, 1, "Oversized white tee with vines printed", "Oversized white tee with vines printed"),
(1, "Juthuur Shorts", 314, 2, 1, "Black mesh shorts with vines printed", "Black mesh shorts with vines printed");

INSERT INTO Images (product_id, image_link, alt_desc, main_image)
VALUES
(1, "https://media.taqdeeralitura.com/products/sweats1.png", "Elegant and heavy oversized sweats", 1),
(2, "https://media.taqdeeralitura.com/products/hoodie1.png", "Heavyweight oversized hoodie in olivegreen", 1),
(2, "https://media.taqdeeralitura.com/products/hoodie2.png", "Heavyweight oversized hoodie in olivegreen", null),
(3, "https://media.taqdeeralitura.com/products/dunes1.png", "Black oversized shirts with breast and torso pockets", 1),
(3, "https://media.taqdeeralitura.com/products/dunes2.png", "Black oversized shirts with breast and torso pockets", null),
(3, "https://media.taqdeeralitura.com/products/dunes3.png", "Black oversized shirts with breast and torso pockets", null),
(4, "https://media.taqdeeralitura.com/products/sweatshirt1.png", "Heavyweight oversized sweatshirt in black", 1),
(4, "https://media.taqdeeralitura.com/products/sweatshirt2.png", "Heavyweight oversized sweatshirt in black", null),
(5, "https://media.taqdeeralitura.com/products/tee1.png", "Oversized white tee with vines printed", 1),
(5, "https://media.taqdeeralitura.com/products/tee2.png", "Oversized white tee with vines printed", null),
(5, "https://media.taqdeeralitura.com/products/tee3.png", "Oversized white tee with vines printed", null),
(6, "https://media.taqdeeralitura.com/products/shorts1.png", "Black mesh shorts with vines printed", 1);

INSERT INTO Components (product_id, component_name)
VALUES
(1, "sweats"),
(2, "hoodie"),
(3, "dunes"),
(4, "sweatshirt"),
(5, "tee"),
(6, "shorts");


INSERT INTO Component_Properties (component_id, property_name)
VALUES 
(1, "450 GSM"),
(1, "100% Organic Cotton"),
(1, "Made In Istanbul"),
(2, "450 GSM"),
(2, "100% Organic Cotton"),
(2, "Made In Istanbul"),
(3, "200 GSM"),
(3, "100% Organic Cotton"),
(3, "Made In Istanbul"),
(4, "450 GSM"),
(4, "100% Organic Cotton"),
(4, "Made In Istanbul"),
(5, "200 GSM"),
(5, "100% Organic Cotton"),
(5, "Made In Istanbul"),
(6, "200 GSM"),
(6, "100% Recycled Polyester"),
(6, "Made In Istanbul");

INSERT INTO Product_Item (product_id, sku, quantity, price, weight)
VALUES
(1, "FRS01/01", 20, 459, 500),
(1, "FRS01/01", 20, 459, 500),
(1, "FRS01/01", 20, 459, 500),
(1, "FRS01/01", 20, 459, 500),
(2, "FRS01/02", 20, 511, 500),
(2, "FRS01/02", 20, 511, 500),
(2, "FRS01/02", 20, 511, 500),
(2, "FRS01/02", 20, 511, 500),
(3, "FRS01/03", 20, 324, 500),
(3, "FRS01/03", 20, 324, 500),
(3, "FRS01/03", 20, 324, 500),
(3, "FRS01/03", 20, 324, 500),
(4, "FRS01/04", 20, 432, 500),
(4, "FRS01/04", 20, 432, 500),
(4, "FRS01/04", 20, 432, 500),
(4, "FRS01/04", 20, 432, 500),
(5, "FRS01/05", 20, 324, 500),
(5, "FRS01/05", 20, 324, 500),
(5, "FRS01/05", 20, 324, 500),
(5, "FRS01/05", 20, 324, 500),
(6, "FRS01/06", 20, 314, 500),
(6, "FRS01/06", 20, 314, 500),
(6, "FRS01/06", 20, 314, 500),
(6, "FRS01/06", 20, 314, 500);

INSERT INTO Product_Configuration (product_item, variation_option)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1),
(6, 2),
(7, 3),
(8, 4),
(9, 1),
(10, 2),
(11, 3),
(12, 4),
(13, 1),
(14, 2),
(15, 3),
(16, 4),
(17, 1),
(18, 2),
(19, 3),
(20, 4),
(21, 1),
(22, 2),
(23, 3),
(24, 4);

INSERT INTO Messages (heading, paragraph) VALUES
("Welcome", "Thank you for visiting our website and your interest in Taqdeer Alitura.
Reminder that all members are entitled to 10% off for their first order for each collection");

INSERT INTO Available_Currencies (currency_code)
VALUES
("AED"),
("BHD"),
("EGP"),
("EUR"),
("GBP"),
("KWD"),
("OMR"),
("QAR"),
("SAR"),
("USD");

INSERT INTO User (email, password, name, tap_customer_id)
VALUES
(
	'khalsags.fateh@gmail.com', 
    '$2a$10$QbGwZJ4F.OR2.90g.unEJOXbNjfOGRC8qwrFu3gsx8T/FezCg2Jf6', 
    'Gurparkash Singh Randhawa',
    "cus_TS05A0920250306k8J73105846"
),
(
	"fandeejani2002@gmail.com", 
    "$2a$10$lWBrWw3etB4Oi.HSixcx9.cHtQz70xm4CuxjZi3wBnVJSzxAEE9hq", 
    "Faris Andeejani",
    "cus_TS01A1220251928l2RY3105207"
);

INSERT INTO Admins (user_id, type_id)
VALUES
(1, 1),
(2, 1);

INSERT INTO Order_Status (name) 
VALUES
("created"),
("address added"),
("items added"),
("invoice created"),
("pending payment"),
("cancelled"),
("processing"),
("shipped"),
("delivered");
