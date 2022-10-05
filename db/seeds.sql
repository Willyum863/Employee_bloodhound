-- Department seeds
INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Accounting'),
    ('HR');

--Roll seeds
INSERT INTO roll (title, salary, department_id)
VALUES 
    ('Jr Sales Rep', 40000, 1),
    ('Sr Sales Rep', 60000, 1),
    ('Accountant', 50000, 2),
    ('Sr Accountant', 70000, 2),
    ('Customer Support', 40000, 3),
    ('Human Resources', 50000, 3);

--Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ryan', 'Howard', 1, NULL),
    ('Jim', 'Halpert', 1, NULL),
    ('Kevin', 'Malone', 2, NULL),
    ('Oscar', 'Martinez', 2, NULL),
    ('Kelly', 'Kapoor', 3, NULL),
    ('Toby', 'Flenderson', 3, NULL),
    ('Michael', 'Scott', 4, 1),
    ('Robert' 'California', 5, 2);