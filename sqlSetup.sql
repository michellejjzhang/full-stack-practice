CREATE DATABASE employees;

-- this create table makes employee id the primary key which means that each value must be unique and the data is indexed
-- indexed means that data is stored in a binary tree which makes it easier to sort and select from the data
-- and the employee id is auto incremented
CREATE TABLE employees.EmployeeInformation (
  EmployeeId int PRIMARY KEY AUTO_INCREMENT,
  Name varchar(255),
  Age int
);

-- by default, the values are added in the same order as the columns
INSERT INTO employees.EmployeeInformation VALUES ("Michelle", 18, 1);
-- unless the order is specified like in this command
INSERT INTO employees.EmployeeInformation(EmployeeId, Age, Name) VALUES (2, 25, "Shafeen");
INSERT INTO employees.EmployeeInformation VALUES ("Alicia", 20, 3);
INSERT INTO employees.EmployeeInformation VALUES ("Junius", 21, 4);
INSERT INTO employees.EmployeeInformation VALUES ("Dana", 19, 5);
INSERT INTO employees.EmployeeInformation VALUES ("Nathan", 19, 6);
-- can insert multiple at a time (this example, employee id has the auto increment on, can not do the above statements
-- with an auto incremented column, will not run
INSERT INTO employees.EmployeeInformation(Name, Age) VALUES
  ("Michelle", 18),
  ("Shafeen", 25),
  ("Alicia", 20),
  ("Junius", 21),
  ("Dana", 19),
  ("Nathan", 19);








