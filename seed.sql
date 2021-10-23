use employees_db;

insert into department (name)
  VALUES 
    ("Engineering"),
    ("HR"),
    ("Legal");

insert into role (title, salary, department_id)
  VALUES 
    ("Payroll Specialist", 50000, 2),
    ("Software Engineer", 50000, 1),
    ("Web Developer", 50000, 1),
    ("Legal Consultant", 50000, 3),
    ("Payroll Supervisor", 70000, 2);

    insert into employee (first_name, last_name, role_id, manager_id)
    VALUES
    ("Anne", "Anderson", 5, NULL),
    ("Bryce", "Bingham", 2, NULL),
    ("Carol", "Coulson", 1, 1),
    ("Drake", "Dixon", 4, null),
    ("Evelyn", "Emerson", 3, 2);

