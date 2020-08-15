USE employeeDB;

INSERT INTO department (name)
VALUES ('Design'), ('Engineering');

INSERT INTO role (title, salary, departmentId)
VALUES ('Creative Director', 100000, 1), ('Senior Designer', 90000, 1), ('Principal Designer', 80000, 1), ('Junior Designer', 60000, 2), ('Project Manager', 100000, 2), ('Project Engineer', 90000, 2), ('Engineer', 60000, 2);

INSERT INTO employee (firstName, lastName, roleId)
VALUES ('Tom', 'Smith', 1), ('Ilana', 'Gerard', 5);

INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES ('Sarah', 'Wolf', 4, 1), ('Manny', 'Beale', 3, 1), ('Clark', 'Gonzales', 6, 2);
