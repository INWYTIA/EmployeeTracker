const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleT = require("console.table");
// const controller = require("/controller.js");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db"
});

function start () {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View",
      "Add",
      "Update Employee Roles",
      "Done"
    ]
  })
  .then(ans => {
    switch(ans.action) {
      case 'View':
        inquirer.prompt({
          name: "action",
          type: "list",
          message: "What would you like to view?",
          choices: [
            "Employees",
            "Roles",
            "Departments",
          ]
        }).then(ans => {
          var target = ans.action.toLowerCase();
          connection.query("SELECT * FROM ??", [target], function(err, res) {
            if (err) throw err;
            console.log(res);
            start();
          });
        })
        break;
      case 'Add':
        inquirer.prompt({
          name: "action",
          type: "list",
          message: "What would you like to add?",
          choices: [
            "Employees",
            "Roles",
            "Departments",
          ]
        }).then(ans => {
          switch(ans.action) {
            case 'Employees':
              inquirer.prompt([
                {
                  name: "first_name",
                  type: "input",
                  message: "What is the first name of this employee?",
                },
                {
                  name: "last_name",
                  type: "input",
                  message: "What is the last name of this employee?"
                }, 
                {
                  name: "role_id",
                  type: "number",
                  message: "What is the ID number of this employee's role?",
                },
                {
                  name: "manager_id",
                  type: "number",
                  message: "What is the ID number of this employee's manager?",
                  default: 0
                }
              ]).then(ans => {
                var manager;
                if (ans.manager_id === 0) {
                  manager = null;
                }else {
                  manager = ans.manager_id;
                };
                connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [ans.first_name, ans.last_name, ans.role_id, manager], function(err, res) {
                  if (err) throw err;
                  console.log(res);
                  start();
                });
              })
              break;
            case 'Roles':
              inquirer.prompt([
                {
                  name: "title",
                  type: "input",
                  message: "What is the title of this role?",
                },
                {
                  name: "salary",
                  type: "number",
                  message: "What is the salary of this role?"
                }, 
                {
                  name: "department_id",
                  type: "number",
                  message: "What is the ID number of this role's department?",
                }
              ]).then(ans => {
                connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [ans.title, ans.salary, ans.department_id], function(err, res) {
                  if (err) throw err;
                  console.log(res);
                  start();
                });
              })
              break;
            case 'Departments':
              inquirer.prompt({
                name: "name",
                type: "input",
                message: "What is the name of this department?",
              }).then(ans => {
                connection.query("INSERT INTO departments (name) VALUES (?)", [ans.name], function(err, res) {
                  if (err) throw err;
                  console.log(res);
                  start();
                });
              })
              break;
        }})
        break;
      case 'Update Employee Roles':
        inquirer.prompt([
          {
            name: "employee_id",
            type: "number",
            message: "What is the id of the employee you want to update?",
          },
          {
            name: "role_id",
            type: "number",
            message: "What is the id of the new role of this employee?"
          },
        ]).then(ans => {
          connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [ans.role_id, ans.employee_id], function(err, res) {
            if (err) throw err;
            console.log(res);
            start();
          });
        })
      case 'Done':
        connection.end();
        break;
    } 
  })
};

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});
