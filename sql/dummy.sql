-- No Dummy data for:
-- Discounts
-- Users
-- Payment_Details
-- Orders
-- Order_Items
-- User_Addresses
-- Shopping_Session
-- Cart_Items
-- Admins

Insert Into Category (category_name)
VALUES
("Tops"),
("Bottoms"),
("Outerwear");


INSERT INTO Collections (collection_name)
VALUES
("Juthuur");


INSERT INTO Permission_Types (name, description)
VALUES
("All", "Permissions for everything");

INSERT INTO Admin_Type (admin_type)
VALUES
("Super Admin");

INSERT INTO Admin_Permissions (permission_id, type_id)
VALUES
(1, 1);

INSERT INTO Products (name, price, category_id, collection_id, sku)
VALUES
("Juthuur Sweats", 459, 1, 1, "FRS01/01"),
("Juthuur Hoodie", 511, 1, 1, "FRS01/02"),
("Juthuur Dunes Tee", 324, 1, 1, "FRS01/03"),
("Juthuur Sweatshirt", 432, 1, 1, "FRS01/04"),
("Juthuur Tee", 324, 1, 1, "FRS01/05"),
("Juthuur Shorts", 314, 1, 1, "FRS01/06");

INSERT INTO Images (product_id, image_link, alt_desc, main_image)
VALUES
(1, "sweats1", "Elegant and heavy oversized sweats", 1),
(2, "hoodie1", "Heavyweight oversized hoodie in olivegreen", 1),
(2, "hoodie2", "Heavyweight oversized hoodie in olivegreen", null),
(3, "dunes1", "Black oversized shirts with breast and torso pockets", 1),
(3, "dunes2", "Black oversized shirts with breast and torso pockets", null),
(3, "dunes3", "Black oversized shirts with breast and torso pockets", null),
(4, "sweatshirt1", "Heavyweight oversized sweatshirt in black", 1),
(4, "sweatshirt2", "Heavyweight oversized sweatshirt in black", null),
(5, "tee1", "Oversized white tee with vines printed", 1),
(5, "tee2", "Oversized white tee with vines printed", null),
(5, "tee3", "Oversized white tee with vines printed", null),
(6, "shorts1", "Black mesh shorts with vines printed", 1);

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