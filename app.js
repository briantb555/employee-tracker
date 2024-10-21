require('dotenv').config();
const inquirer = require('inquirer');
const pg = require('pg');
const Manager = require('./Manager');
const { printTable } = require('console-table-printer');

const pool = new pg.Pool();
const manager = new Manager(pool);


const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update Employee Manager', 'View Employees by Manager', 'View Employees by Department', 'Delete Department', 'Delete Role', 'Delete Employee', 'View Department Budget' ,'Exit'],
    },
];

function menu() {
    inquirer.prompt(questions).then((answers) => {
        switch (answers.option) {
            case 'View all Departments':
                viewDepartments();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View Employees by Manager':
                viewEmployeesByManager();
                break;
            case 'View Employees by Department':
                viewEmployeesByDepartment();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'View Department Budget':
                viewDepartmentBudgets();
                break;
            case 'Exit':
                pool.end();
                console.log('Goodbye!');
                process.exit();
                break;            
        }
    });
}

async function viewDepartments() {
    const result = await manager.viewDepartments();
    printTable(result);
    menu();
}

async function viewRoles() {
    const result = await manager.viewRoles();
    printTable(result);
    menu();
}

async function viewEmployees() {
    const result = await manager.viewEmployees();
    printTable(result);
    menu();
}

async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department',
        },
    ]);
    await manager.addDepartment(answer.name);
    console.log('Department added');
    menu();
}

async function addRole() {
    const departments = await manager.viewDepartments();
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department',
            choices: departments.map((department) => ({
                name: department.name,
                value: department.id,
            })),
        },
    ]);
    await manager.addRole(answer.title, answer.salary, answer.departmentId);
    console.log('Role added');
    menu();
}

async function addEmployee() {
    const roles = await manager.viewRoles();
    const employees = await manager.viewEmployees();
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee',
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the role',
            choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
            })),
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the manager',
            choices: function() {
                const employeeChoices = employees.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }));
                employeeChoices.unshift({ name: 'None', value: null });
                return employeeChoices;
            },
        },
    ]);
    await manager.addEmployee(answer.firstName, answer.lastName, answer.roleId, answer.managerId);
    console.log('Employee added');
    menu();
}

async function updateEmployeeRole() {
    const employees = await manager.viewEmployees();
    const roles = await manager.viewRoles();
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee',
            choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            })),
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role',
            choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
            })),
        },
    ]);
    await manager.updateEmployeeRole(answer.employeeId, answer.roleId);
    console.log('Employee role updated');
    menu();
}
async function updateEmployeeManager() {
    const employees = await manager.viewEmployees();
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee',
            choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            })),
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the new manager',
            choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            })),
        },
    ]);
    await manager.updateEmployeeManager(answer.employeeId, answer.managerId);
    console.log('Employee manager updated');
    menu();
}
async function viewEmployeesByManager() {
    const result = await manager.viewEmployeesByManager();
    printTable(result);
    menu();
}
async function viewEmployeesByDepartment() {
    const result = await manager.viewEmployeesByDepartment();
    printTable(result);
    menu();
}
async function deleteDepartment() {
    const departments = await manager.viewDepartments();
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the department to delete',
            choices: departments.map((department) => ({
                name: department.name,
                value: department.id,
            })),
        },
    ]);
    await manager.deleteDepartment(answer.id);
    console.log('Department deleted');
    menu();
}
async function deleteRole() {
    const roles = await manager.viewRoles();
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the role to delete',
            choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
            })),
        },
    ]);
    await manager.deleteRole(answer.id);
    console.log('Role deleted');
    menu();
}
async function deleteEmployee() {
    const employees = await manager.viewEmployees();
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the employee to delete',
            choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            })),
        },
    ]);
    await manager.deleteEmployee(answer.id);
    console.log('Employee deleted');
    menu();
}
async function viewDepartmentBudgets() {
    const result = await manager.viewDepartmentBudgets();
    printTable(result);
    menu();
}

menu();
