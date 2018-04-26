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
value ("Black T-shirt", "clothing", 20.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Blue T-shirt", "clothing", 22.00, 7);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("White T-shirt", "clothing", 25.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Nike", "shoes", 25.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("New balance", "shoes", 25.00, 7);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Dress Shoes", "shoes", 31.00, 5);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Condor", "shoes", 61.00, 1);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Pajamas", "clothing", 15.00, 3);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Gown", "clothing", 25.00, 33);
insert into products (product_name, department_name, Price, Stock_quantity)
value ("Robe", "clothing", 11.00, 51);


);