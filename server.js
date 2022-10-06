const inquirer = require('inquirer');
const connection = require('./db/connections');
const mysql = require('mysql2');
const cTable = require("console.table");

//inquirer prompts
function start() {
  console.log("");
  inquirer.prompt([{
        type: "list",
        name: "NavPrompt",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employess",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then(function (data) {
      switch (data.nav) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role ":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          quit();
          break;
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//View All Departments
const viewAllDepartments = () => {
  var sql = `SELECT * FROM department`;
  connection.query(sql, (err, res) => {
      if (err) throw err;
      console.log('All Departments:');
      console.table(res);
      start();
  });
}

//View All Roles
const viewAllRoles= () => {
  var sql = `SELECT * FROM department`;
  connection.query(sql, (err, res) => {
      if (err) throw err;
      console.log('All Roles:');
      console.table(res);
      start();
  });
}

// View All Employees
const viewAllEmployees = () => {
  var sql = `SELECT eleft.first_name, eleft.last_name, title, name as department, salary, CONCAT(eright.first_name, ' ', eright.last_name) AS manager FROM employee as eLeft LEFT JOIN role ON eleft.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee eright ON eleft.manager_id = eright.id`;
  connection.query(sql, (err, res) => {
      if (err) throw err;
      console.log('All Employees:');
      console.table(res);
      start();
  });
}

start();

