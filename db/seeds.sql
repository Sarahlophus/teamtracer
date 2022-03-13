INSERT INTO departments (dept_name) 
VALUES ("Animal Care"),
       ("Animal Adoptions");
       
INSERT INTO roles (title, salary, department_id) 
VALUES ("Care Manager", 60000, 1),
		("Care Technician", 40000, 1),
       ("Adoption Manager", 60000, 2),
       ("Adoption Guide", 40000, 2);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Buddy", "Baker", 1, NULL),
       ("Garfield", "Logan", 2, 1),
       ("Doreen", "Green", 2, 1),
        ("Selina", "Kyle", 3, NULL),
       ("Sophia", "Sanduval", 4, 4),
       ("Eliza", "Thornberry", 4, 4);
     