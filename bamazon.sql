DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;


insert into products (product_name, department_name, Price, Stock_quantity)
value ("T-shirt 01", "clothing", 20.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("T-shirt 02", "clothing", 22.00, 7);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("T-shirt 03", "clothing", 25.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Shoes 01", "shoes", 25.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Shoes 02", "shoes", 25.00, 7);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Shoes 03", "shoes", 31.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Shoes 04", "shoes", 61.00, 1);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("pajama", "clothing", 15.00, 3);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("pajama", "clothing", 25.00, 33);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("pajama", "clothing", 11.00, 51);


);