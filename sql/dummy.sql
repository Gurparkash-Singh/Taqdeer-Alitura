-- Missing Size Chart Values
-- Update Email List Using Resend

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
("size components", "The ability to add, update and delete components for the size chart", 1, 1, 1),
("product variations", "The ability to add, update and delete variations on a product type (ex add Size / Colour to Clothing)", 1, 1, 1),
("variation options", "The ability to add, update and delete options for a variation (ex add XXL to Size)", 6, 1, 1),
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
(9, 1, 1),
(10, 1, 1),
(11, 1, 1),
(12, 1, 1),
(13, 1, 1),
(14, 1, 1),
(15, 1, 1),
(16, 1, 1),
(17, 1, 1),
(18, 1, 1),
(19, 1, 1),
(20, 1, 1),
(21, 1, 1),
(22, 1, 1),
(23, 1, 0),
(24, 1, 1),
(25, 1, 0),
(26, 1, 1),
(27, 1, 1),
(28, 1, 0);


INSERT INTO Variations(name) VALUE ("Size");

INSERT INTO Variation_Options (variation_id, value) 
VALUES
(1, "S"),
(1, "M"),
(1, "L"),
(1, "XL");

INSERT INTO Products (type_id, name, default_price, category_id, collection_id, description, image_alt_desc)
VALUES
(
	4, 
    "Juthuur Sweats", 
    370, 
    2, 
    1, 
    "A pair sweatpants in black, with prints from medieval Islamic medical texts.", 
    "A pair sweatpants in black, with prints from medieval Islamic medical texts."
),
(
	5, 
    "Juthuur Hoodie", 
    420, 
    1, 
    1, 
    "A hoodie in green, with prints from medieval medical texts.", 
    "A hoodie in green, with prints from medieval medical texts."
),
(
	2, 
    "Juthuur Dunes Tee", 
    245, 
    1, 
    1, 
    "A tee in dark grey, with a print depicting a deserts dunes and clouds on top of two pockets.", 
    "A tee in dark grey, with a print depicting a deserts dunes and clouds on top of two pockets."
),
(
	3, 
    "Juthuur Sweatshirt", 
    355, 
    1, 
    1, 
    "A sweatshirt in black, with prints from medieval Islamic medical texts.", 
    "A sweatshirt in black, with prints from medieval Islamic medical texts."
),
(
	2, 
    "Juthuur Tee", 
    210, 
    1, 
    1, 
    "A tee in white, with prints from medieval Islamic medical texts.", 
    "A tee in white, with prints from medieval Islamic medical texts."
),
(
	6, 
    "Juthuur Shorts", 
    265, 
    2, 
    1, 
    "A pair of shorts in black, with prints from medieval Islamic medical texts.", 
    "A pair of shorts in black, with prints from medieval Islamic medical texts."
);

INSERT INTO Product_Variations (variation_id, product_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6);

INSERT INTO Product_Variation_Options (product_id, option_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(6, 3),
(6, 4);

INSERT INTO Size_Chart_Components (name)
VALUES
("pit-to-pit"),
("cross shoulder"),
("sleeve length"),
("length"),
("hem"),
("inseam"),
("outseam"),
("waist"),
("hip length");

INSERT INTO Product_Size_Chart_Components (product_id, component_id)
VALUES
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(2, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 5),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(6, 6),
(6, 7),
(6, 8),
(6, 9);

INSERT INTO Images (product_id, image_link, small_image, medium_image, large_image, alt_desc, main_image)
VALUES
(
	1,
    "https://media.taqdeeralitura.com/products/product1-52421ea0-324e-4fdc-997c-76d483e1fd1b.jpg",
    "https://media.taqdeeralitura.com/products/product1-52421ea0-324e-4fdc-997c-76d483e1fd1b--small.jpg",
    "https://media.taqdeeralitura.com/products/product1-52421ea0-324e-4fdc-997c-76d483e1fd1b--medium.jpg",
    "https://media.taqdeeralitura.com/products/product1-52421ea0-324e-4fdc-997c-76d483e1fd1b--large.jpg",
    "A pair sweatpants in black, with prints from medieval Islamic medical texts.",
    null
),
(
	1,
    "https://media.taqdeeralitura.com/products/product1-ffc8f691-edb0-4767-87b1-6ff06833b58d.png",
    "https://media.taqdeeralitura.com/products/product1-ffc8f691-edb0-4767-87b1-6ff06833b58d--small.png",
    "https://media.taqdeeralitura.com/products/product1-ffc8f691-edb0-4767-87b1-6ff06833b58d--medium.png",
    "https://media.taqdeeralitura.com/products/product1-ffc8f691-edb0-4767-87b1-6ff06833b58d--large.png",
    "A pair sweatpants in black, with prints from medieval Islamic medical texts.",
    null
),
(
	1,
    "https://media.taqdeeralitura.com/products/product1-cc6b5ce8-26c7-4f27-86dd-b2684d91986c.png",
    "https://media.taqdeeralitura.com/products/product1-cc6b5ce8-26c7-4f27-86dd-b2684d91986c--small.png",
    "https://media.taqdeeralitura.com/products/product1-cc6b5ce8-26c7-4f27-86dd-b2684d91986c--medium.png",
    "https://media.taqdeeralitura.com/products/product1-cc6b5ce8-26c7-4f27-86dd-b2684d91986c--large.png",
    "A pair sweatpants in black, with prints from medieval Islamic medical texts.",
    1
),
(
	2,
    "https://media.taqdeeralitura.com/products/product2-04537386-4a38-4641-a4a5-64c6f273b9cd.jpg",
    "https://media.taqdeeralitura.com/products/product2-04537386-4a38-4641-a4a5-64c6f273b9cd--small.jpg",
    "https://media.taqdeeralitura.com/products/product2-04537386-4a38-4641-a4a5-64c6f273b9cd--medium.jpg",
    "https://media.taqdeeralitura.com/products/product2-04537386-4a38-4641-a4a5-64c6f273b9cd--large.jpg",
    "A hoodie in green, with prints from medieval medical texts.",
    null
),
(
    2,
    "https://media.taqdeeralitura.com/products/product2-35861f72-9e44-48d9-be70-a3fde595a74e.png",
    "https://media.taqdeeralitura.com/products/product2-35861f72-9e44-48d9-be70-a3fde595a74e--small.png",
    "https://media.taqdeeralitura.com/products/product2-35861f72-9e44-48d9-be70-a3fde595a74e--medium.png",
    "https://media.taqdeeralitura.com/products/product2-35861f72-9e44-48d9-be70-a3fde595a74e--large.png",
    "A hoodie in green, with prints from medieval medical texts.",
    null
),
(
    2,
    "https://media.taqdeeralitura.com/products/product2-ecbd8384-551d-4210-b702-0651bf372266.png",
    "https://media.taqdeeralitura.com/products/product2-ecbd8384-551d-4210-b702-0651bf372266--small.png",
    "https://media.taqdeeralitura.com/products/product2-ecbd8384-551d-4210-b702-0651bf372266--medium.png",
    "https://media.taqdeeralitura.com/products/product2-ecbd8384-551d-4210-b702-0651bf372266--large.png",
    "A hoodie in green, with prints from medieval medical texts.",
    1
),
(
    2,
    "https://media.taqdeeralitura.com/products/product2-628acaef-c26d-4805-b4b7-f2c88541285b.png",
    "https://media.taqdeeralitura.com/products/product2-628acaef-c26d-4805-b4b7-f2c88541285b--small.png",
    "https://media.taqdeeralitura.com/products/product2-628acaef-c26d-4805-b4b7-f2c88541285b--medium.png",
    "https://media.taqdeeralitura.com/products/product2-628acaef-c26d-4805-b4b7-f2c88541285b--large.png",
    "A hoodie in green, with prints from medieval medical texts.",
    null
),
(
    3,
    "https://media.taqdeeralitura.com/products/product3-ce007976-de5b-4c40-82f7-3043c9a263c8.png",
    "https://media.taqdeeralitura.com/products/product3-ce007976-de5b-4c40-82f7-3043c9a263c8--small.png",
    "https://media.taqdeeralitura.com/products/product3-ce007976-de5b-4c40-82f7-3043c9a263c8--medium.png",
    "https://media.taqdeeralitura.com/products/product3-ce007976-de5b-4c40-82f7-3043c9a263c8--large.png",
    "A tee in dark grey, with a print depicting a deserts dunes and clouds on top of two pockets.",
    1
),
(
    3,
    "https://media.taqdeeralitura.com/products/product3-6c5f77e0-2c81-4a05-93ea-913f4628afa2.png",
    "https://media.taqdeeralitura.com/products/product3-6c5f77e0-2c81-4a05-93ea-913f4628afa2--small.png",
    "https://media.taqdeeralitura.com/products/product3-6c5f77e0-2c81-4a05-93ea-913f4628afa2--medium.png",
    "https://media.taqdeeralitura.com/products/product3-6c5f77e0-2c81-4a05-93ea-913f4628afa2--large.png",
    "A tee in dark grey, with a print depicting a deserts dunes and clouds on top of two pockets.",
    null
),
(
    3,
    "https://media.taqdeeralitura.com/products/product3-0fd3e996-4178-49f4-897f-9a79304125f2.png",
    "https://media.taqdeeralitura.com/products/product3-0fd3e996-4178-49f4-897f-9a79304125f2--small.png",
    "https://media.taqdeeralitura.com/products/product3-0fd3e996-4178-49f4-897f-9a79304125f2--medium.png",
    "https://media.taqdeeralitura.com/products/product3-0fd3e996-4178-49f4-897f-9a79304125f2--large.png",
    "A tee in dark grey, with a print depicting a deserts dunes and clouds on top of two pockets.",
    null
),
(
    4,
    "https://media.taqdeeralitura.com/products/product4-4751d68b-2742-4182-b55b-3727ed68abf9.jpg",
    "https://media.taqdeeralitura.com/products/product4-4751d68b-2742-4182-b55b-3727ed68abf9--small.jpg",
    "https://media.taqdeeralitura.com/products/product4-4751d68b-2742-4182-b55b-3727ed68abf9--medium.jpg",
    "https://media.taqdeeralitura.com/products/product4-4751d68b-2742-4182-b55b-3727ed68abf9--large.jpg",
    "A sweatshirt in black, with prints from medieval Islamic medical texts.",
    null
),
(
    4,
    "https://media.taqdeeralitura.com/products/product4-9bdfbd3e-0f0e-4b3b-9f3e-24c1e891326c.png",
    "https://media.taqdeeralitura.com/products/product4-9bdfbd3e-0f0e-4b3b-9f3e-24c1e891326c--small.png",
    "https://media.taqdeeralitura.com/products/product4-9bdfbd3e-0f0e-4b3b-9f3e-24c1e891326c--medium.png",
    "https://media.taqdeeralitura.com/products/product4-9bdfbd3e-0f0e-4b3b-9f3e-24c1e891326c--large.png",
    "A sweatshirt in black, with prints from medieval Islamic medical texts.",
    null
),
(
    4,
    "https://media.taqdeeralitura.com/products/product4-ea0fd9e7-a2b3-47a4-959a-1b216976f924.png",
    "https://media.taqdeeralitura.com/products/product4-ea0fd9e7-a2b3-47a4-959a-1b216976f924--small.png",
    "https://media.taqdeeralitura.com/products/product4-ea0fd9e7-a2b3-47a4-959a-1b216976f924--medium.png",
    "https://media.taqdeeralitura.com/products/product4-ea0fd9e7-a2b3-47a4-959a-1b216976f924--large.png",
    "A sweatshirt in black, with prints from medieval Islamic medical texts.",
    1
),
(
    5,
    "https://media.taqdeeralitura.com/products/product5-79e5deba-64e2-4485-ae79-17c4fcf27d09.png",
    "https://media.taqdeeralitura.com/products/product5-79e5deba-64e2-4485-ae79-17c4fcf27d09--small.png",
    "https://media.taqdeeralitura.com/products/product5-79e5deba-64e2-4485-ae79-17c4fcf27d09--medium.png",
    "https://media.taqdeeralitura.com/products/product5-79e5deba-64e2-4485-ae79-17c4fcf27d09--large.png",
    "A tee in white, with prints from medieval Islamic medical texts.",
    1
),
(
    5,
    "https://media.taqdeeralitura.com/products/product5-fff97375-c4a3-4267-a002-e77b9681571d.png",
    "https://media.taqdeeralitura.com/products/product5-fff97375-c4a3-4267-a002-e77b9681571d--small.png",
    "https://media.taqdeeralitura.com/products/product5-fff97375-c4a3-4267-a002-e77b9681571d--medium.png",
    "https://media.taqdeeralitura.com/products/product5-fff97375-c4a3-4267-a002-e77b9681571d--large.png",
    "A tee in white, with prints from medieval Islamic medical texts.",
    null
),
(
    6,
    "https://media.taqdeeralitura.com/products/product6-d7768452-67ec-4bd5-b65e-0c458b1f76c6.jpg",
    "https://media.taqdeeralitura.com/products/product6-d7768452-67ec-4bd5-b65e-0c458b1f76c6--small.jpg",
    "https://media.taqdeeralitura.com/products/product6-d7768452-67ec-4bd5-b65e-0c458b1f76c6--medium.jpg",
    "https://media.taqdeeralitura.com/products/product6-d7768452-67ec-4bd5-b65e-0c458b1f76c6--large.jpg",
    "A pair of shorts in black, with prints from medieval Islamic medical texts.",
    null
),
(
    6,
    "https://media.taqdeeralitura.com/products/product6-f6b5e014-e7f9-4a5c-9520-bfb711212bd3.png",
    "https://media.taqdeeralitura.com/products/product6-f6b5e014-e7f9-4a5c-9520-bfb711212bd3--small.png",
    "https://media.taqdeeralitura.com/products/product6-f6b5e014-e7f9-4a5c-9520-bfb711212bd3--medium.png",
    "https://media.taqdeeralitura.com/products/product6-f6b5e014-e7f9-4a5c-9520-bfb711212bd3--large.png",
    "A pair of shorts in black, with prints from medieval Islamic medical texts.",
    1
);

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
(1, "FRS01/01S", 16, 370, 500),
(1, "FRS01/01M", 14, 370, 500),
(1, "FRS01/01L", 15, 370, 500),
(1, "FRS01/01XL", 13, 370, 500),
(2, "FRS01/02S", 11, 420, 500),
(2, "FRS01/02M", 14, 420, 500),
(2, "FRS01/02L", 13, 420, 500),
(2, "FRS01/02XL", 6, 420, 500),
(3, "FRS01/03S", 12, 245, 500),
(3, "FRS01/03M", 13, 245, 500),
(3, "FRS01/03L", 12, 245, 500),
(3, "FRS01/03XL", 11, 245, 500),
(4, "FRS01/04S", 15, 355, 500),
(4, "FRS01/04M", 17, 355, 500),
(4, "FRS01/04L", 16, 355, 500),
(4, "FRS01/04XL", 14, 355, 500),
(5, "FRS01/05S", 28, 210, 500),
(5, "FRS01/05M", 30, 210, 500),
(5, "FRS01/05L", 31, 210, 500),
(5, "FRS01/05XL", 21, 210, 500),
(6, "FRS01/06S", 11, 265, 500),
(6, "FRS01/06M", 21, 265, 500),
(6, "FRS01/06L", 22, 265, 500),
(6, "FRS01/06XL", 13, 265, 500);

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
("Welcome", "We're greatful for your support.
Enjoy browsing and shopping through our collection.");

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

INSERT INTO Early_Access (email)
VALUES
("khalsags.fateh@gmail.com"),
("fandeejani2002@gmail.com");

INSERT INTO User (email, password, name, tap_customer_id)
VALUES
(
	"khalsags.fateh@gmail.com", 
    "$2a$10$dmZz8.OLrk38z/vQE.ZwfOnShU8gOEPQNAxOelANS1w7.MuHQHp8i", 
    "Gurparkash Singh",
    "cus_LV02G2520250314j8M50808521"
),
(
	"Fandeejani2002@gmail.com", 
    "$2a$10$Rx6n4T97QS8CA97krlNHa.PFC8SNGZ8AsKBptoQq3dqwvHz/T4xGS", 
    "Faris Andeejani",
    "cus_LV04G3120250315r4YD0808291"
);

INSERT INTO Admins (type_id, user_id)
VALUES
(1, 1),
(1, 2);

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
