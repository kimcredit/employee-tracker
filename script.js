const mysql = require('mysql');
const inquirer = require('inquirer');
const tableDisplay = require('console.table');


//Boilerplate 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    //input password
    password: "popcicle11",
    database: "employeeDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

//Initial User Choice
function start() {
    console.log("Welcome to your employee tracker");
    console.log("- - - - - - - - - - - - - - -");
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
	switch (answer.userSelect) {
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

//Shows all departments in the database
function viewDepartments() {
    console.log("working?");
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        console.log("- - - - - - - - - - - - - - -");
        //restart function
        start();
    });
}

//Shows all roles in the database
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, roles) {
        if (err) throw err;
        console.table(roles);
        console.log("- - - - - - - - - - - - - - -");
        //restart function
        start();
    });
}

//Shows all employees in the database
function viewEmployees() {
    connection.query("SELECT * FROM employee" , function (err, employees) {
        if (err) throw err;
        console.table(employees);
        console.log("- - - - - - - - - - - - - - -");
        //restart function
        start();
    });
}

//Adds department the database
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Enter new department: "
    }).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.department], function(err, department) {
            if (err) throw err;
            console.log("The department " + answer.department + " has been added");
            console.log("- - - - - - - - - - - - - - -");
            //restart function
            start();
        });
    });
}

//Adds role to database
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter job title: "
        },
        {
            type: "number",
            name: "salary",
            message: "Enter salary: "
        },
        {
            type: "number",
            name: "id",
            message: "Enter department ID: "
        }
    ]). then(answers => {
        connection.query("INSERT INTO role (title, salary, departmentId) VALUES (?, ?, ?)", [answers.title, answers.salary, answers.id], function (err, role) {
            if (err) throw err;
            console.log("The role " + answers.title + " has been added");
            console.log("- - - - - - - - - - - - - - -");
            //restart function
            start();
        });
    });
}

//Adds employee to database
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee first name"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee last name"
        },
        {
            name: "roleId",
            type: "number",
            message: "Enter employee role ID"
        },
        {
            name: "managerId",
            type: "number",
            message: "Enter employee ID"
        }
    ]).then(answers => {
        connection.query("INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, answers.roleId, answers.managerId], function(err, employee) {
            if (err) throw err;
            console.log(Answers.firstName + " was added to employees");
            console.log("- - - - - - - - - - - - - - -");
            //restart function
            start();
        });
    });
}

//Updates employee role
function updateRole() {
    inquirer.prompt([
        {
            name: "employeeId",
            type: "input",
            message: "Enter employee ID of role to update"
        },
        {
            name: "roleId",
            type: "input",
            message: "Enter updated Role ID"
        }
    ]).then(answers => {
        connection.query("UPDATE employee SET roleID = ? WHERE id = ?", [answers.roleId, answers.employeeId], function(err, newRole) {
            if (err) throw err;
            console.log("- - - - - - - - - - - - - - -");
            console.log("Update successful");
            console.log("- - - - - - - - - - - - - - -");
            //restart function
            start();
        });
    });
}