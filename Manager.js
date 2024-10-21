class Manager {
    constructor(pool) {
        this.pool = pool;
    }

    async viewDepartments() {
        const result = await this.pool.query('SELECT * FROM department');
        return result.rows;
    }
    async viewRoles() {
        const result = await this.pool.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id');
        return result.rows;
    }
    async viewEmployees() {
        const result = await this.pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`);
        return result.rows;
    }
    async addDepartment(name) {
        await this.pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    }
    async addRole(title, salary, departmentId) {
        await this.pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    }
    async addEmployee(firstName, lastName, roleId, managerId) {
        await this.pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    }
    async updateEmployeeRole(employeeId, roleId) {
        await this.pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    }

    async updateEmployeeManager(employeeId, managerId) {
        await this.pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [managerId, employeeId]);
    }
    async deleteDepartment(id) {
        await this.pool.query('DELETE FROM department WHERE id = $1', [id]);
    }
    async deleteRole(id) {
        await this.pool.query('DELETE FROM role WHERE id = $1', [id]);
    }
    async deleteEmployee(id) {
        await this.pool.query('DELETE FROM employee WHERE id = $1', [id]);
    }
    async viewDepartmentBudgets() {
        const result = await this.pool.query('SELECT department.id, department.name, SUM(role.salary) AS budget FROM department JOIN role ON department.id = role.department_id JOIN employee ON role.id = employee.role_id GROUP BY department.id, department.name');
        return result.rows;
    }
    async viewEmployeesByManager() {
        const result = await this.pool.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN employee manager ON employee.manager_id = manager.id`);
        return result.rows;
    }
    async viewEmployeesByDepartment() {
        const result = await this.pool.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id GROUP BY department.name, employee.id`);
        return result.rows;
    }

}

module.exports = Manager;