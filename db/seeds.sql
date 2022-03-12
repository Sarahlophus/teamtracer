INSERT INTO departments (dept_name) 
VALUES ("Animal Care"),
       ("Animal Adoptions");
       
INSERT INTO roles (title, salary, department_id) 
VALUES ("Manager", 50000, 1),
       ("Manager", 50000, 2),
       ("Technician", 35000, 1),
       ("Guide", 35000, 2);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Buddy", "Baker", 1, NULL),
       ("Selina", "Kyle", 2, NULL),
       ("Garfield", "Logan", 3, 1),
       ("Doreen", "Green", 3, 1),
       ("Sophia", "Sanduval", 4, 2);
     