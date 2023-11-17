CREATE TABLE IF NOT EXISTS barber_shop.Barbershop(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    location varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS barber_shop.Barber(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(20) NOT NULL,
    password varchar(255) NOT NULL,
    barbershop_id int NULL,
    availability varchar(255) NOT NULL,
    CONSTRAINT barbershop_id FOREIGN KEY (barbershop_id) REFERENCES barber_shop.Barbershop(id)
);

CREATE INDEX idx_barber_email ON barber_shop.Barber(email);

CREATE TABLE IF NOT EXISTS barber_shop.Customer(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone int NOT NULL,
    password varchar(255) NOT NULL
);

CREATE INDEX idx_customer_email ON barber_shop.Customer(email);

CREATE TABLE IF NOT EXISTS barber_shop.Images(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    data longblob NULL,
    shop_id int NULL
);

CREATE TABLE IF NOT EXISTS barber_shop.Inventory(
    id int AUTO_INCREMENT PRIMARY KEY,
    product_name varchar(50) NULL,
    product_description varchar(50) NULL,
    product_price int NULL
);

CREATE TABLE IF NOT EXISTS barber_shop.Items(
    id int AUTO_INCREMENT PRIMARY KEY,
    item_name varchar(50) NULL,
    price int NULL,
    barbershop_id int NULL,
    CONSTRAINT Shop_Items_Barbershop_id_fk FOREIGN KEY (barbershop_id) REFERENCES barber_shop.Barbershop(id)
);

CREATE TABLE IF NOT EXISTS barber_shop.Manager(
    id int AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NULL,
    name varchar(50) NULL,
    barbershop_id int NULL,
    password varchar(255) NULL,
    phone varchar(50) NULL,
    CONSTRAINT Manager_Barbershop_id_fk FOREIGN KEY (barbershop_id) REFERENCES barber_shop.Barbershop(id)
);

CREATE TABLE IF NOT EXISTS barber_shop.Services(
    id int AUTO_INCREMENT PRIMARY KEY,
    service_name varchar(50) NULL,
    price int NULL,
    barber_id int NULL,
    availability tinyint(1) NULL,
    CONSTRAINT Services_Barber_id_fk FOREIGN KEY (barber_id) REFERENCES barber_shop.Barber(id)
);

CREATE TABLE IF NOT EXISTS barber_shop.Bookings(
    id int AUTO_INCREMENT PRIMARY KEY,
    barber_id int NOT NULL,
    customer_id int NOT NULL,
    date_time datetime NOT NULL,
    status varchar(10) NULL,
    barbershop_id int NULL,
    service_id int NULL,
    CONSTRAINT Bookings_Barbershop_id_fk FOREIGN KEY (barbershop_id) REFERENCES barber_shop.Barbershop(id),
    CONSTRAINT Bookings_Services_id_fk FOREIGN KEY (service_id) REFERENCES barber_shop.Services(id),
    CONSTRAINT bookings_ibfk_1 FOREIGN KEY (barber_id) REFERENCES barber_shop.Barber(id),
    CONSTRAINT bookings_ibfk_2 FOREIGN KEY (customer_id) REFERENCES barber_shop.Customer(id)
);

CREATE INDEX barber_id_index ON barber_shop.Bookings(barber_id);

CREATE INDEX customer_id_index ON barber_shop.Bookings(customer_id);

