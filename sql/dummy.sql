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

Insert Into Category (category_name, description)
VALUES
("Tops", "Shirts and stuff"),
("Bottoms", "Pants and stuff"),
("Swimwear", "Beach Cloths");


INSERT INTO Collections (collection_name, description)
VALUES
("Spring", "Our spring collection"),
("Summer", "Our summer collection"),
("Fall", "Our fall collection"),
("Winter", "Our winter collection");


INSERT INTO Permission_Types (name, description)
VALUES
("All", "Permissions for everything");

INSERT INTO Admin_Type (admin_type)
VALUES
("Super Admin");

INSERT INTO Admin_Permissions (permission_id, type_id)
VALUES
(1, 1);

INSERT INTO Products (name, description, price, category_id, collection_id)
VALUES
("White Shirt", "A plain white shirt", 120, 1, 1),
('Wine - Marlbourough Sauv Blanc', 'Callorhinus ursinus', 613.91, 1, 2),
('Chocolate - Liqueur Cups With Foil', 'Macropus robustus', 633.4, 1, 3),
('Juice - Tomato, 10 Oz', 'Semnopithecus entellus', 487.46, 1, 4),
('Salmon - Atlantic, No Skin', 'Nucifraga columbiana', 335.89, 2, 1),
('Wine - Winzer Krems Gruner', 'Panthera leo', 541.95, 2, 2),
('Coconut - Shredded, Sweet', 'Salvadora hexalepis', 341.53, 2, 3),
('Ginger - Ground', 'Phalacrocorax carbo', 561.01, 2, 4),
('Sage - Fresh', 'unavailable', 522.7, 3, 1),
('Carbonated Water - Cherry', 'Diceros bicornis', 430.51, 3, 2),
('Lotus Root', 'Marmota caligata', 439.88, 3, 3),
('Brandy Cherry - Mcguinness', 'Chauna torquata', 470.43, 3, 4),
('Lobster - Base', 'Lamprotornis superbus', 477.7, 1, 1),
('Muffin Mix - Oatmeal', 'Canis lupus lycaon', 385.8, 1, 2),
('Tomatillo', 'Tayassu pecari', 604.66, 1, 3),
('Pheasants - Whole', 'Chelodina longicollis', 535.26, 1, 4),
('Sherbet - Raspberry', 'Castor fiber', 417.28, 2, 1),
('Cheese - Havarti, Roasted Garlic', 'Dusicyon thous', 416.33, 2, 2),
('Scallop - St. Jaques', 'Spheniscus magellanicus', 606.0, 2, 3),
('Coffee Beans - Chocolate', 'Eremophila alpestris', 552.03, 2, 4),
('Lamb - Racks, Frenched', 'Priodontes maximus', 644.08, 3, 1);

INSERT INTO Images (product_id, image_link, alt_desc, main_image)
VALUES
(1, "white-shirt", "A plain white shirt", 1),
(2, "black-shirt", "A plain black shirt", 1),
(3, "black-shirt", "A plain black shirt", 1),
(4, "black-shirt", "A plain black shirt", 1),
(5, "black-shirt", "A plain black shirt", 1),
(6, "black-shirt", "A plain black shirt", 1),
(7, "black-shirt", "A plain black shirt", 1),
(8, "black-shirt", "A plain black shirt", 1),
(9, "black-shirt", "A plain black shirt", 1),
(10, "black-shirt", "A plain black shirt", 1),
(11, "black-shirt", "A plain black shirt", 1),
(12, "black-shirt", "A plain black shirt", 1),
(13, "black-shirt", "A plain black shirt", 1),
(14, "black-shirt", "A plain black shirt", 1),
(15, "black-shirt", "A plain black shirt", 1),
(16, "black-shirt", "A plain black shirt", 1),
(17, "black-shirt", "A plain black shirt", 1),
(18, "black-shirt", "A plain black shirt", 1),
(19, "black-shirt", "A plain black shirt", 1),
(20, "black-shirt", "A plain black shirt", 1),
(21, "black-shirt", "A plain black shirt", 1);

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
(6, "Extra Large", "XL", 20),
(7, "Small", "S", 20),
(7, "Medium", "M", 20),
(7, "Large", "L", 20),
(7, "Extra Large", "XL", 20),
(8, "Small", "S", 20),
(8, "Medium", "M", 20),
(8, "Large", "L", 20),
(8, "Extra Large", "XL", 20),
(9, "Small", "S", 20),
(9, "Medium", "M", 20),
(9, "Large", "L", 20),
(9, "Extra Large", "XL", 20),
(10, "Small", "S", 20),
(10, "Medium", "M", 20),
(10, "Large", "L", 20),
(10, "Extra Large", "XL", 20),
(11, "Small", "S", 20),
(11, "Medium", "M", 20),
(11, "Large", "L", 20),
(11, "Extra Large", "XL", 20),
(12, "Small", "S", 20),
(12, "Medium", "M", 20),
(12, "Large", "L", 20),
(12, "Extra Large", "XL", 20),
(13, "Small", "S", 20),
(13, "Medium", "M", 20),
(13, "Large", "L", 20),
(13, "Extra Large", "XL", 20),
(14, "Small", "S", 20),
(14, "Medium", "M", 20),
(14, "Large", "L", 20),
(14, "Extra Large", "XL", 20),
(15, "Small", "S", 20),
(15, "Medium", "M", 20),
(15, "Large", "L", 20),
(15, "Extra Large", "XL", 20),
(16, "Small", "S", 20),
(16, "Medium", "M", 20),
(16, "Large", "L", 20),
(16, "Extra Large", "XL", 20),
(17, "Small", "S", 20),
(17, "Medium", "M", 20),
(17, "Large", "L", 20),
(17, "Extra Large", "XL", 20),
(18, "Small", "S", 20),
(18, "Medium", "M", 20),
(18, "Large", "L", 20),
(18, "Extra Large", "XL", 20),
(19, "Small", "S", 20),
(19, "Medium", "M", 20),
(19, "Large", "L", 20),
(19, "Extra Large", "XL", 20),
(20, "Small", "S", 20),
(20, "Medium", "M", 20),
(20, "Large", "L", 20),
(20, "Extra Large", "XL", 20),
(21, "Small", "S", 20),
(21, "Medium", "M", 20),
(21, "Large", "L", 20),
(21, "Extra Large", "XL", 20);