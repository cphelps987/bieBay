DROP DATABASE IF EXISTS bieBay;
CREATE DATABASE bieBay;

USE bieBay;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quanity INT default 0,
  autographed TINYINT default 0,
  PRIMARY KEY (id)
);
