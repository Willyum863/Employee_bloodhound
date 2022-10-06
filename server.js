const inquirer = require('inquirer');
const connection = require('./db/connections');
const mysql = require('mysql2');
const cTable = require("console.table");

//inquirer prompts
const start = () => {
  console.log('Employee Bloodhound');
  inquirer.prompt([{
        type: "list",
        name: "NavPrompt",
        message: "How can Bloodhound help you?",
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
  var sql = `SELECT role.id, title, salary, name as department FROM role LEFT JOIN department ON role.department_id = department.id`;
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

//Add Department
const addDepartment = () => {
  inquirer.prompt([
      {
          type: 'input',
          name: 'department',
          message: 'Enter Department Name',
          validate: addDepartment => {
              if(addDepartment) {
                  return true;
              } else {
                  console.log('')
                  return false;
              }
          }
      }
  ])
  .then(answer => {
      const sql = `INSERT INTO department (name)
              VALUES (?)`;
      connection.query(sql, answer.addDepartment, (err, res) => {
          if (err) throw err;
          console.log('New department ' + answer.addDepartment + ' added.')
          viewAllDepartments();
      });
  });
}

//Add Role
const addRole = () => {
  connection.query('Select * FROM department', (err, department) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What's the new role's title?"
        },
        {
          type: "input",
          name: "salary",
          message: "What's the new role's salary?"
        },
        {
          type: "list",
          name: "department",
          message: "What's the new role's department?",
          choices: myDeps
        }
      ])
      .then(function (data) {
        connection.query("INSERT INTO role SET ?",
          {
            title: data.title,
            salary: data.salary,
            department_id: data.department,
          },
          function (err, res) {
            if (err) throw err;
            viewAllRoles()
          }
        );
      });
  });
}

//Add Employee
const addEmployee = () => {
  return inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: 'What is the first name of the new employee?'
      },
      {
          type: 'input',
          name: 'last_name',
          message: 'What is the last name of the new employee?'
      },
      {
          type: 'input',
          name: 'role_id',
          message: 'What is the role of the new employee?'
      },
      {
          type: 'input',
          name: 'manager_id',
          message: 'What is the employees manager id?'
      }
  ])
  .then(answer => {
    if (answer.manager_id === 'None') {
        answer.manager_id = null;
    };
    const param = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`;
    
    connection.query(sql, param, (err, res) => {
        if (err) throw err;
        console.log('New employee ' + answer.first_name + ' ' + answer.last_name + ' added.')
    viewAllEmployees();
    });
});
}



start();

