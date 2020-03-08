CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  CONSTRAINT role_check,
  FOREIGN KEY (role_id),
  REFERENCES roles (id),
  ON DELETE SET NULL,
  ON UPDATE CASCADE,
  CONSTRAINT manager_check,
  FOREIGN KEY (manager_id),
  REFERENCES employees (id),
  ON DELETE SET NULL,
  ON UPDATE CASCADE
)

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
)

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
  CONSTRAINT department_check,
  FOREIGN KEY (department_id),
  REFERENCES departments (id),
  ON DELETE SET NULL,
  ON UPDATE CASCADE
)