const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'EzhkoBezhko',
    database: 'movie_db'
  },
);

  function generalMenu() {
    console.log("Welcome to the Employee Database");
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
        switch(answer) {
          case "View All Departments": db.query();
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

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is already taken. Please enter a different number.";
              }
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's GitHub username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is already taken. Please enter a different number.";
              }
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }


generalMenu();
