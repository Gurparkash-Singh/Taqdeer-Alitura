-- No Dummy data for:
-- Discounts
-- Payment_Details
-- Orders
-- Order_Items
-- User_Addresses
-- Shopping_Session
-- Cart_Items

Insert Into Category (category_name)
VALUES
("Tops"),
("Bottoms"),
("Outerwear");


INSERT INTO Collections (collection_name)
VALUES
("Juthuur");


INSERT INTO Permission_Types (name, description, readable, writeable)
VALUES
("collections", "Ability to read and write collections", 1, 1),
("categories", "Ability to read and write categories", 1, 1),
("products", "Ability to read and write products", 1, 1),
("images", "Ability to read and write product images", 1, 1),
("sizes", "Ability to read and write sizes for products", 1, 1),
("components", "Ability to read and write product components", 1, 1),
("component properties", "Ability to read and write properties for components", 1, 1),
("discounts", "Ability to read and write discounts", 1, 1),
("users", "Ability to get a list of users (names and emails)", 1, 0),
("orders", "Ability to read orders for a given user", 1, 0),
("orders items", "Ability to read order items for a given user", 1, 0),
("messages", "Ability to read and write messages", 1, 1),
("members", "Ability to read and write members", 1, 1),
("member types", "Ability to read and write member types", 1, 1),
("contact form", "Ability to read contact form emails", 1, 0),
("email list", "Ability to read and write users from email list", 1, 1),
("carts", "Ability to read abandoned carts", 1, 0),
("admins", "Ability to read and write admins", 1, 1),
("admin types", "Ability to read and write admin types", 1, 1),
("admin permissions", "Ability to read permissions for admins types", 1, 0),
("errors", "Ability to read errors", 1, 0);

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
(21, 1, 0);

INSERT INTO Products (name, price, category_id, collection_id, sku, description)
VALUES
("Juthuur Sweats", 459, 2, 1, "FRS01/01", "Elegant and heavy oversized sweats"),
("Juthuur Hoodie", 511, 1, 1, "FRS01/02", "Heavyweight oversized hoodie in olivegreen"),
("Juthuur Dunes Tee", 324, 1, 1, "FRS01/03", "Black oversized shirts with breast and torso pockets"),
("Juthuur Sweatshirt", 432, 1, 1, "FRS01/04", "Heavyweight oversized sweatshirt in black"),
("Juthuur Tee", 324, 1, 1, "FRS01/05", "Oversized white tee with vines printed"),
("Juthuur Shorts", 314, 2, 1, "FRS01/06", "Black mesh shorts with vines printed");

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


INSERT INTO Sizes_Available (product_id, size_name, size_abbreviation, quantity)
VALUES
(1, "Small", "S", 20),
(1, "Medium", "M", 20),
(1, "Large", "L", 20),
(1, "Extra Large", "XL", 20),
(2, "Small", "S", 20),
(2, "Medium", "M", 20),
(2, "Large", "L", 20),
(2, "Extra Large", "XL", 20),
(3, "Small", "S", 20),
(3, "Medium", "M", 20),
(3, "Large", "L", 20),
(3, "Extra Large", "XL", 20),
(4, "Small", "S", 20),
(4, "Medium", "M", 20),
(4, "Large", "L", 20),
(4, "Extra Large", "XL", 20),
(5, "Small", "S", 20),
(5, "Medium", "M", 20),
(5, "Large", "L", 20),
(5, "Extra Large", "XL", 20),
(6, "Small", "S", 20),
(6, "Medium", "M", 20),
(6, "Large", "L", 20),
(6, "Extra Large", "XL", 20);

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
    null
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
("processing"),
("shipped"),
("delivered");
