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

INSERT INTO Products (name, description, quantity, price, category_id, collection_id)
VALUES
("White Shirt", "A plain white shirt", 100, 120, 1, 1),
('Wine - Marlbourough Sauv Blanc', 'Callorhinus ursinus', 256, 613.91, 1, 2),
('Chocolate - Liqueur Cups With Foil', 'Macropus robustus', 240, 633.4, 1, 3),
('Juice - Tomato, 10 Oz', 'Semnopithecus entellus', 241, 487.46, 1, 4),
('Salmon - Atlantic, No Skin', 'Nucifraga columbiana', 233, 335.89, 2, 1),
('Wine - Winzer Krems Gruner', 'Panthera leo', 240, 541.95, 2, 2),
('Coconut - Shredded, Sweet', 'Salvadora hexalepis', 254, 341.53, 2, 3),
('Ginger - Ground', 'Phalacrocorax carbo', 249, 561.01, 2, 4),
('Sage - Fresh', 'unavailable', 247, 522.7, 3, 1),
('Carbonated Water - Cherry', 'Diceros bicornis', 256, 430.51, 3, 2),
('Lotus Root', 'Marmota caligata', 253, 439.88, 3, 3),
('Brandy Cherry - Mcguinness', 'Chauna torquata', 240, 470.43, 3, 4),
('Lobster - Base', 'Lamprotornis superbus', 256, 477.7, 1, 1),
('Muffin Mix - Oatmeal', 'Canis lupus lycaon', 246, 385.8, 1, 2),
('Tomatillo', 'Tayassu pecari', 246, 604.66, 1, 3),
('Pheasants - Whole', 'Chelodina longicollis', 258, 535.26, 1, 4),
('Sherbet - Raspberry', 'Castor fiber', 238, 417.28, 2, 1),
('Cheese - Havarti, Roasted Garlic', 'Dusicyon thous', 259, 416.33, 2, 2),
('Scallop - St. Jaques', 'Spheniscus magellanicus', 246, 606.0, 2, 3),
('Coffee Beans - Chocolate', 'Eremophila alpestris', 258, 552.03, 2, 4),
('Lamb - Racks, Frenched', 'Priodontes maximus', 241, 644.08, 3, 1);

INSERT INTO Images (product_id, image_link, alt_desc)
VALUES
(1, "white-shirt.png", "A plain white shirt"),
(2, "white-shirt.png", "A plain white shirt"),
(3, "white-shirt.png", "A plain white shirt"),
(4, "white-shirt.png", "A plain white shirt"),
(5, "white-shirt.png", "A plain white shirt"),
(6, "white-shirt.png", "A plain white shirt"),
(7, "white-shirt.png", "A plain white shirt"),
(8, "white-shirt.png", "A plain white shirt"),
(9, "white-shirt.png", "A plain white shirt"),
(10, "white-shirt.png", "A plain white shirt"),
(11, "white-shirt.png", "A plain white shirt"),
(12, "white-shirt.png", "A plain white shirt"),
(13, "white-shirt.png", "A plain white shirt"),
(14, "white-shirt.png", "A plain white shirt"),
(15, "white-shirt.png", "A plain white shirt"),
(16, "white-shirt.png", "A plain white shirt"),
(17, "white-shirt.png", "A plain white shirt"),
(18, "white-shirt.png", "A plain white shirt"),
(19, "white-shirt.png", "A plain white shirt"),
(20, "white-shirt.png", "A plain white shirt"),
(21, "white-shirt.png", "A plain white shirt");