-- Add ability for multiple discounts and discounts on orders
-- Remove total from orders to normalize database (finish step 1 first)

CREATE TABLE Category (
    category_id int primary key not null AUTO_INCREMENT,
    category_name varchar(255) not null,
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Collections (
	collection_id int primary key not null AUTO_INCREMENT,
    collection_name varchar(255) not null,
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Discount (
    discount_id int primary key not null AUTO_INCREMENT,
    name varchar(255),
    description text,
    discount_percent decimal not null,
    active boolean DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE User (
    user_id int primary key not null AUTO_INCREMENT,
    email varchar(255) not null,
    password text not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    telephone varchar(255),
    DOB DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Permission_Types (
    permission_id int not null primary key AUTO_INCREMENT,
    name varchar(255) not null,
    description varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Admin_Type (
    type_id int primary key not null AUTO_INCREMENT,
    admin_type varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Admin_Permissions (
    id int not null primary key AUTO_INCREMENT,
    permission_id int not null,
    type_id int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (permission_id) REFERENCES Permission_Types(permission_id),
    FOREIGN KEY (type_id) REFERENCES Admin_Type(type_id)
);

-- Possibly update SKU
CREATE TABLE Products (
    product_id int primary key not null AUTO_INCREMENT,
    name varchar(255) not null,
    description text not null,
    sku varchar(255),
    category_id int not null,
    collection_id int,
    price decimal not null,
    origin text,
    discount_id int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(collection_id),
    FOREIGN KEY (discount_id) REFERENCES Discount(discount_id)
);

CREATE TABLE Sizes_Available (
	size_id int not null primary key auto_increment,
	product_id int not null,
    size_name text not null,
    size_abbreviation text not null,
    quantity int DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Images (
	image_id int primary key not null AUTO_INCREMENT,
    product_id int not null,
    image_link text not null,
    alt_desc text not null,
    main_image boolean DEFAULT Null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    UNIQUE (product_id, main_image)
);


CREATE TABLE Payment_Details (
    payment_id int not null primary key AUTO_INCREMENT,
    amount decimal not null,
    provider varchar(255) not null,
    status varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    order_id int not null primary key AUTO_INCREMENT,
    user_email varchar(255) not null,
    total decimal not null,
    payment_id int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES Payment_Details(payment_id)
);

CREATE TABLE Order_Items (
    id int not null primary key AUTO_INCREMENT,
    order_id int not null,
    product_id int not null,
    size_id int not null,
    quantity int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (size_id) REFERENCES Sizes_Available(size_id)
);


-- User email does not refer to users table so guest checkout can work
CREATE TABLE User_Addresses (
    address_id int primary key not null AUTO_INCREMENT,
    user_email varchar(255) not null,
    address_line1 varchar(255) not null,
    address_line2 varchar(255),
    city varchar(255) not null,
    postal_code varchar(255) not null,
    country varchar(255) not null,
    telephone varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE User_Tokens (
    id int not null primary key auto_increment,
    user_id int not null,
    token LONGTEXT not null,
    expired BOOLEAN DEFAULT 0,
    expires_at TIMESTAMP not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Shopping_Session (
    id int not null primary key AUTO_INCREMENT,
    token LONGTEXT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Cart_Items (
    session_id int not null,
    product_id int not null,
    size_id int not null,
    quantity int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES Shopping_Session(id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (size_id) REFERENCES Sizes_Available(size_id),
    PRIMARY KEY (session_id, product_id, size_id)
);

CREATE TABLE Admins (
    admin_id int primary key not null AUTO_INCREMENT,
    user_id int not null,
    type_id int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (type_id) REFERENCES Admin_Type(type_id)
);