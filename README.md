
Employee Tracker

## Concept

A command-line application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Screenshot

![image](https://github.com/user-attachments/assets/47f74a11-76ea-4268-8888-1d6001020c2d)


## How to Use

Use: "node app.js" in the terminal

Options will generate:
View all Departments
  View all Roles
  View all Employees
  Add a Department
  Add a Role
  Add an Employee
  Update an Employee Role
   Update Employee Manager
  View Employees by Manager
  View Employees by Department
> Delete Department
  Delete Role
  Delete Employee
  View Department Budget
> Exit


You can View, Add, Update, and Delete:
Departments
Roles
Employees
Manager Assignment
Salaries
and Departmnet Budget

### Walkthrough Video: 

https://drive.google.com/file/d/1CI_oLcWcwMU4oIBBe4oAcjSyfC49i6N0/view

=======
# employee-tracker
A program designed to display and allow modification of an employee database
>>>>>>> 81ececdc6cfda477af0647fb1b5d5ddb0ceb9c0f
