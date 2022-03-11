INSERT INTO departments (dept_name) 
VALUES ("Animal Adoptions"),
       ("Animal Care"),
       ("Clinic"),
       ("Programs and Learning");

INSERT INTO roles (title, salary, department_id) 
VALUES ("Director", 75000, 1),
       ("Manager", 65000, 1),
       ("Specialist", 35000, 1),
       ("Director", 76000, 2),
       ("Manager", 66000, 2),
       ("Specialist", 33000, 2),
       ("Director", 77000, 3),
       ("Manager", 63000, 3),
       ("Technician", 39000, 3),
       ("Director", 79000, 4),
       ("Manager", 60000, 4),
       ("Specialist", 34000, 4);
       

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Katniss", "Everdeen", 1, NULL),
       ("Peeta", "Mellark", 2, NULL),
       ("Primrose", "Everdeen", 3, 2),
       ("Hermione", "Granger", 4, NULL),
       ("Harry", "Potter", 5, NULL),
       ("Ron", "Weasley", 6, 5),
       ("Louis", "de Pointe du Lac", 7, NULL),
       ("Lestat", "de Lioncourt", 8, NULL),
       ("Daniel", "Molloy", 9, 8),
       ("Gandalf", "Grey", 10, NULL),
       ("Frodo", "Baggins", 11, NULL),
       ("Samwise", "Gamgee", 12, 11);