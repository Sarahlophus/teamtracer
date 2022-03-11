DROP DATABASE IF EXISTS teamtracer_db;
CREATE DATABASE teamtracer_db;

USE teamtracer_db;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary INT NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES departments(id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES roles (id),
FOREIGN KEY (manager_id)
REFERENCES employees(id)
);