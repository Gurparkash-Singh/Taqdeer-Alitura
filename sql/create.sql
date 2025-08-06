-- Add ability for multiple discounts and discounts on orders
CREATE TABLE IF NOT EXISTS Errors (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    error_id INT,
    location TEXT NOT NULL,
    error_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Category (
    category_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Collections (
	collection_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    collection_name VARCHAR(255) NOT NULL,
    description TEXT,
    live BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Variations (
	variation_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Variation_Options(
	option_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    variation_id INT NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES Variations(variation_id)
);

CREATE TABLE IF NOT EXISTS Size_Chart_Components (
	component_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Possibly update SKU
CREATE TABLE IF NOT EXISTS Products (
    product_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    live BOOLEAN DEFAULT 1,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_alt_desc TEXT NOT NULL,
    category_id INT NOT NULL,
    collection_id INT,
    type_id INT NOT NULL,
    default_price DECIMAL NOT NULL,
    size_chart_above_text TEXT,
    size_chart_below_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id)
);

CREATE TABLE IF NOT EXISTS Product_Variations(
	variation_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES Variations(variation_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    PRIMARY KEY (variation_id, product_id)
);

CREATE TABLE IF NOT EXISTS Product_Variation_Options(
	option_id INT NOT NULL,
    product_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (option_id) REFERENCES Variation_Options(option_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    PRIMARY KEY (option_id, product_id)
);

CREATE TABLE IF NOT EXISTS Product_Size_Chart_Components (
	product_id INT NOT NULL,
    component_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (product_id) REFERENCES Products(product_id),
	FOREIGN KEY (component_id) REFERENCES Size_Chart_Components(component_id)
);

CREATE TABLE IF NOT EXISTS Product_Item (
	item_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    sku VARCHAR(255),
    quantity INT NOT NULL,
    price DECIMAL,
    weight DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    CHECK (quantity >= 0)
);

CREATE TABLE IF NOT EXISTS Product_Configuration (
	product_item INT NOT NULL,
    variation_option INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_item) REFERENCES Product_Item(item_id),
    FOREIGN KEY (variation_option) REFERENCES Variation_Options(option_id),
    PRIMARY KEY (product_item, variation_option)
);

CREATE TABLE IF NOT EXISTS Size_Chart_Values (
    component_id INT NOT NULL,
    product_id INT NOT NULL,
    option_id INT NOT NULL,
    value DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (component_id) REFERENCES Size_Chart_Components(component_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    PRIMARY KEY(component_id, product_id, option_id)
);

CREATE TABLE IF NOT EXISTS Images (
	image_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_link TEXT NOT NULL,
    alt_desc TEXT NOT NULL,
    main_image BOOLEAN DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    UNIQUE (product_id, main_image)
);

CREATE TABLE IF NOT EXISTS Components (
	component_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    component_name TEXT NOT NULL,
    component_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE IF NOT EXISTS Component_Properties (
	property_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	component_id INT NOT NULL,
    property_name TEXT NOT NULL,
    property_description TEXT,
    property_value TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (component_id) REFERENCES Components(component_id)
);

CREATE TABLE IF NOT EXISTS User (
    user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    telephone VARCHAR(255),
    date_of_birth DATE,
    tap_customer_id TEXT,
    verified_email BOOLEAN DEFAULT 0,
    verified_phone BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Member_Types (
    type_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Members(
    member_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    member_type INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (member_type) REFERENCES Member_Types(type_id)
);

CREATE TABLE IF NOT EXISTS Discount (
    discount_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) NOT NULL UNIQUE,
    discount_amount DECIMAL NOT NULL,
    percentage BOOLEAN DEFAULT 1,
    active BOOLEAN DEFAULT 0,
    product_only BOOLEAN DEFAULT 0,
    product_id INT,
    collection_only BOOLEAN DEFAULT 0,
    collection_id INT,
    category_only BOOLEAN DEFAULT 0,
    category_id INT,
    member_only BOOLEAN DEFAULT 0,
    member_type INT,
    required_num_item INT,
	max_uses_per_cart INT,
	max_uses_per_user INT,
	max_uses_overall INT,
	max_discount_value DECIMAL,
    payout_email TEXT,
    login_required BOOLEAN DEFAULT 0,
    min_subtotal DECIMAL DEFAULT 0,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (member_type) REFERENCES Member_Types(type_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id)
);

CREATE TABLE IF NOT EXISTS Permission_Types (
    permission_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    readable BOOLEAN DEFAULT 1,
    writeable BOOLEAN NOT NULL,
    parent_permission INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_permission) REFERENCES Permission_Types(permission_id)
);

CREATE TABLE IF NOT EXISTS Admin_Type (
    type_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    admin_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Admin_Permissions (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    permission_id INT NOT NULL,
    type_id INT NOT NULL,
    allow_read BOOLEAN DEFAULT 1,
    allow_write BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (permission_id) REFERENCES Permission_Types(permission_id),
    FOREIGN KEY (type_id) REFERENCES Admin_Type(type_id)
);

CREATE TABLE IF NOT EXISTS Payment_Details (
    payment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL NOT NULL,
    provider VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Addresses (
    address_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    province VARCHAR (255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Addresses (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    address_id INT NOT NULL,
    user_id INT NOT NULL,
    address_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (address_id) REFERENCES Addresses(address_id)
);

CREATE TABLE IF NOT EXISTS Order_Status (
	status_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Orders (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    tap_order_id VARCHAR(255),
    tap_charge_id VARCHAR(255),
    tap_receipt VARCHAR(255),
    tracking_id VARCHAR(255),
    name TEXT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    telephone VARCHAR(255) NOT NULL,
    payment_id INT,
    status INT DEFAULT 1,
    order_address INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES Payment_Details(payment_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (order_address) REFERENCES Addresses(address_id),
    FOREIGN KEY (status) REFERENCES Order_Status(status_id)
);

CREATE TABLE IF NOT EXISTS Order_Invoice_Items (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    amount DECIMAL NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id)
);

CREATE TABLE IF NOT EXISTS Order_Items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (item_id) REFERENCES Product_Item(item_id)
);

CREATE TABLE IF NOT EXISTS Order_Discounts (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    discount_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)
);

CREATE TABLE IF NOT EXISTS User_Cards (
    card_id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    object TEXT,
    brand TEXT,
    first_six_digits TEXT NOT NULL,
    last_four_digits TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Tokens (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token LONGTEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS Shopping_Session (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    token LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Cart_Discounts (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    discount_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES Shopping_Session(id),
    FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)
);

CREATE TABLE IF NOT EXISTS Cart_Items (
    session_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES Shopping_Session(id),
    FOREIGN KEY (item_id) REFERENCES Product_Item(item_id),
    PRIMARY KEY (session_id, item_id)
);

CREATE TABLE IF NOT EXISTS Admins (
    admin_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (type_id) REFERENCES Admin_Type(type_id)
);

CREATE TABLE IF NOT EXISTS Messages (
	message_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    heading TEXT NOT NULL,
    paragraph LONGTEXT NOT NULL,
    broadcast BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_OTP (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token TEXT NOT NULL,
    service TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS Email_List(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    email TEXT NOT NULL,
    subscribed BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Email_Unsubscribe_Token (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email TEXT NOT NULL,
    token LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Contact_Form_Emails(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email TEXT NOT NULL,
    message LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Available_Currencies(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    currency_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Early_Access (
	email VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE OR REPLACE VIEW Admin_Type_And_Permission AS
SELECT Admins.admin_id, PT1.permission_id, PT1.name,
(
	SELECT PT2.name FROM Permission_Types AS PT2
    WHERE PT1.parent_permission = PT2.permission_id
) AS parent_permission_name, PT1.parent_permission,
AT.admin_type, AT.type_id, Admin_Permissions.allow_read, Admin_Permissions.allow_write
FROM Permission_Types AS PT1
JOIN Admin_Permissions ON Admin_Permissions.permission_id = PT1.permission_id
JOIN Admin_Type AS AT ON AT.type_id = Admin_Permissions.type_id
JOIN Admins ON Admins.type_id = AT.type_id;