INSERT INTO departments (name)
VALUES ('cubicle');
INSERT INTO departments (name)
VALUES ('mail room');

INSERT INTO roles (title, salary, department_id)
VALUES ('grunt', 20000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ('foreman', 20000.01, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ('grunt', 50000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ('manager', 60000.01, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Dude', 'McBro', 1, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Bro', 'McDude', 2, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Debbie', 'Gossip', 3, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Serious', 'Face', 4, NULL);