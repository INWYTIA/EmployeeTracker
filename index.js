const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleT = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db"
});

function start () {
  var bucket = [];
  var employeeTable = [];
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    for (key of res) {
      for (thing in key) {
        bucket.push(key[thing]);
      };
      employeeTable.push(bucket);
      bucket = [];
    };
  });
  var roleTable = [];
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    for (key of res) {
      for (thing in key) {
        bucket.push(key[thing]);
      };
      roleTable.push(bucket);
      bucket = [];
    };
  });
  var departmentTable = [];
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    for (key of res) {
      for (thing in key) {
        bucket.push(key[thing]);
      };
      departmentTable.push(bucket);
      bucket = [];
    };
  });
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
          switch (ans.action) {
            case 'Employees':
              console.table(['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'], employeeTable);
              break;
            case 'Roles':
              console.table(['ID', 'Title', 'Salary', 'Department ID'], roleTable);
              break;
            case 'Departments':
              console.table(['ID', 'Name',], departmentTable);
              break;
          }
            start();
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
                  console.log('Success!');
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
                  console.log('Success!');
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
                  console.log('Success!');
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
            console.log('Success!');
            start();
          });
        })
        break;
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
