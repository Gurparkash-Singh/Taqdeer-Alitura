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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Possibly update SKU
CREATE TABLE IF NOT EXISTS Products (
    product_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    live BOOLEAN DEFAULT 1,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sku VARCHAR(255),
    category_id INT NOT NULL,
    collection_id INT,
    price DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id)
);

CREATE TABLE IF NOT EXISTS Sizes_Available (
	size_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	product_id INT NOT NULL,
    size_name TEXT NOT NULL,
    size_abbreviation TEXT NOT NULL,
    quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
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
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id)
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

CREATE TABLE IF NOT EXISTS Permission_Types (
    permission_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    readable BOOLEAN DEFAULT 1,
    writeable BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

CREATE TABLE IF NOT EXISTS User_Addresses (
    address_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_name TEXT,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    province VARCHAR (255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE IF NOT EXISTS Order_Addresses (
    address_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_address_id INT,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    province VARCHAR (255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    country TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    FOREIGN KEY (order_address) REFERENCES Order_Addresses(address_id),
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
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (size_id) REFERENCES Sizes_Available(size_id)
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
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES Shopping_Session(id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (size_id) REFERENCES Sizes_Available(size_id),
    PRIMARY KEY (session_id, product_id, size_id)
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

CREATE TABLE IF NOT EXISTS Member_Discount (
	member_discount_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
    required_num_item INT,
	max_uses_per_cart INT,
	max_uses_per_user INT,
	max_uses_overall INT,
	max_discount_value DECIMAL,
    min_subtotal DECIMAL DEFAULT 0,
    payout_email TEXT,
    member_type INT NOT NULL,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (member_type) REFERENCES Member_Types(type_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id)
);

CREATE TABLE IF NOT EXISTS Member_Cart_Discounts (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    discount_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES Shopping_Session(id),
    FOREIGN KEY (discount_id) REFERENCES Member_Discount(member_discount_id)
);

CREATE TABLE IF NOT EXISTS Member_Order_Discounts (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    discount_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (discount_id) REFERENCES Member_Discount(member_discount_id)
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

CREATE TABLE IF NOT EXISTS Contact_Form_Emails(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email TEXT NOT NULL,
    message LONGTEXT NOT NULL,
    error BOOLEAN DEFAULT 0,
    error_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Available_Currencies(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    currency_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE OR REPLACE VIEW Admin_Type_And_Permission AS
SELECT Admins.admin_id, Admins.type_id, Permission_Types.permission_id, name, allow_read, allow_write
FROM Admins
JOIN Admin_Type ON Admins.type_id = Admin_Type.type_id
JOIN Admin_Permissions ON Admin_Permissions.type_id = Admin_Type.type_id
JOIN Permission_Types ON Admin_Permissions.permission_id = Permission_Types.permission_id;