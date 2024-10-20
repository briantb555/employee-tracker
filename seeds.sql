INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

INSERT INTO role (title, salary, department_id) VALUES
  ('Finance Manager', 120000, 2),
  ('Sales Lead', 80000, 4),
  ('Lead Engineer', 120000, 1),
  ('Legal Team Lead', 250000, 3),
  ('Engineer', 100000, 1),
  ('Accountant', 80000, 2),
  ('Lawyer', 120000, 3),
  ('Salesperson', 60000, 4),
  ('Software Engineer', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Danny', 'Henderson', 1, NULL),
  ('Bob', 'Smith', 2, NULL),
  ('Charlie', 'Brown', 3, NULL),
  ('Diana', 'Severance', 4, NULL),
  ('Eve', 'Johnson', 5, 4),
  ('Frank', 'Furter', 6, 1),
  ('Grace', 'Hopper', 7, 4),
  ('Elon', 'Ivanov', 8, 2),
  ('Janet', 'Jackson', 9, 3);

