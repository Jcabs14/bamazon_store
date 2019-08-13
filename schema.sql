DROP DATABASE if EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(150) NULL,
    department_name VARCHAR(150) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT,
    primary key(item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Xbox one', 'Electronics', 299.99, 50),('Playstation 4', 'Electronics', 299.99, 47),('Cheap T-shirt', 'Clothing', 4.99, 100),
('Expensive T-Shirt', 'Clothing', 99.99, 34),('Oreos', 'Food', 1.99, 423),('Macadamian Nut Coffee', 'Food', 3.99, 232),('Toothbrush', 'Bath', 3.99, 10),
('Toliet paper', 'Bath', 2.99, 5),('Pencils', 'Office', 1.99, 20),('Printing Paper', 'Office ', 3.99, 35);

use bamazon;
SELECT * from products;