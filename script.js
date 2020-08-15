const mysql = require('mysql');
const inquirer = require('inquirer');
const tableDisplay = require('console.table');

//Boilerplate 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

//Initial User Choice
function start() {
    console.log("Welcome to the Employee Tracker");
	inquirer.prompt({
		name: 'userSelect',
		type: 'list',
		message: 'Select a task:',
		choices: [
			'View All Departments',
			'View All Roles',
			'View All Employees',
			'Add Department',
			'Add Role',
			'Add Employee',
			'Update Employee Role',
			'Exit'
        ]
    //run function based on user choice
	}).then(answer => {
	switch (answer.selectOption) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            default:
                connection.end()
                break;
        }
	});
}