const inquirer = require('inquirer');
const connection = require('./db/connections');
const mysql = require('mysql2');

//inquirer prompts
function runApp() {
  console.log("");
  inquirer.prompt([{
        type: "list",
        name: "nav",
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
          viewAllRolls();
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
