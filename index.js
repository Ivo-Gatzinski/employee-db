const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("table");

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'EzhkoBezhko',
    database: 'employees_db',
  },
);

function viewAll(answer) {
  db.promise().query("SELECT * FROM department;")
          .then( ([rows]) => {
            console.table(rows);
          })
          .catch(console.log);
          getInput(input);
          if (input) {
            startAgain();
          }
          
};

function startAgain() {
  console.clear();
  generalMenu();
}

  function generalMenu() {
    console.log("Welcome to the Employee Database!");
    inquirer
      .prompt([
        {
          type: "list",
          name: "generalMenu",
          message: "What would you like to do?",
          choices: ["View All Departments", 
          "View All Roles", 
          "View All Employees", 
          "Add a Department", 
          "Add a Role", 
          "Add an Employee", 
          "Update an Employee Role"],
        },
      ])
      .then((answer) => {
        switch(answer.generalMenu) {
          case "View All Departments": viewAll(answer.generalMenu);
            break;
          case "View All Roles":
            break;
          case "View All Employees":
            break;
          case "Add a Department":
            break;
          case "Add a Role":
            break;
          case "Add an Employee":
            break;
          case "Update an Employee Role":
            break;
        }
      });
  }

generalMenu();
