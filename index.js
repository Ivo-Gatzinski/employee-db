const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "EzhkoBezhko",
  database: "employees_db",
});

function viewAllDept(answer) {
  return db
    .promise()
    .query("SELECT * FROM department;")
    .then(([rows]) => {
      console.table(rows);
      return generalMenu();
    })
    .catch(console.log);
}

function viewAllRoles(answer) {
  return db
    .promise()
    .query("SELECT * FROM role;")
    .then(([rows]) => {
      console.table(rows);
      return generalMenu();
    })
    .catch(console.log);
}

function viewAllEmploy(answer) {
  return db
    .promise()
    .query(
      `select
  a.id,
  CONCAT(a.first_name, " ", a.last_name) AS name,
  CONCAT(b.first_name, " ", b.last_name) AS manager
from employee AS a LEFT JOIN employee AS b
on a.manager_id = b.id;;`
    )
    .then(([rows]) => {
      console.table(rows);
      return generalMenu();
    })
    .catch(console.log);
}

function deptAdd(answer) {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What is the name of the Department?",
      },
    ])
    .then((answer) => {
      return db
        .promise()
        .query(`insert into department (name) values ("${answer.deptName}");`)
        .then(() => {
          console.log("Department added!");
          return generalMenu();
        });
    });
}

function generalMenu() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "generalMenu",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit App",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.generalMenu) {
        case "View All Departments":
          viewAllDept(answer.generalMenu);
          break;
        case "View All Roles":
          viewAllRoles(answer.generalMenu);
          break;
        case "View All Employees":
          viewAllEmploy(answer.generalMenu);
          break;
        case "Add a Department":
          deptAdd(answer.generalMenu);
          break;
        case "Add a Role":
          break;
        case "Add an Employee":
          break;
        case "Update an Employee Role":
          break;
        case "Exit App":
          process.exit();
          break;
      }
    });
}

console.log("Welcome to the Employee Database!");
generalMenu();
