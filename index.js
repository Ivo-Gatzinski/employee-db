const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "EzhkoBezhko",
  database: "employees_db",
});

function viewAllDept() {
  return db
    .promise()
    .query("SELECT * FROM department;")
    .then(([rows]) => {
      console.table(rows);
      return generalMenu();
    })
    .catch(console.log);
}

function viewAllRoles() {
  return db
    .promise()
    .query(
      "select role.id, title, name AS department, salary from role JOIN department on role.department_id = department.id;"
    )
    .then(([rows]) => {
      console.table(rows);
      return generalMenu();
    })
    .catch(console.log);
}

function viewAllEmploy() {
  return db
    .promise()
    .query(
      `select
      a.id,
      CONCAT(a.first_name, " ", a.last_name) AS name,
      CONCAT(b.first_name, " ", b.last_name) AS manager,
      role.title as role, 
      role.salary,
      department.name as department
    from employee AS a 
    LEFT JOIN employee AS b
    on a.manager_id = b.id
    JOIN role on a.role_id = role.id
    JOIN department on role.department_id = department.id;`
    )
    .then(([rows]) => {
      console.table(rows);
      return generalMenu();
    })
    .catch(console.log);
}

function deptAdd() {
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
        .query('insert into department set ?', [{name: answer.deptName}])
        .then(() => {
          console.log("Department added!");
          return generalMenu();
        });
    });
}

function addRole() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the Role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the Role?",
      },
      {
      type: "input",
       name: "department",
       message: "What is the Department ID of the Role?",
      },
    ])
    .then((answer) => {
      return db
        .promise()
        .query('insert into role set ?;', [{title: answer.roleName, salary: answer.salary, department_id: answer.department} ])
        .then(() => {
          console.log("Role added!");
          return generalMenu();
        });
    });
}

function addEmpl() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
      },
      {
      type: "input",
       name: "roleId",
       message: "What is the Role ID of the employee?",
      },
      {
        type: "input",
         name: "managerId",
         message: "What is the Manager ID of the employee?",
        },
    ])
    .then((answer) => {
      return db
        .promise()
        .query(`insert into employee set ?;`, [{first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleId, manager_id: answer.managerId} ])
        .then(() => {
          console.log("Employee added!");
          return generalMenu();
        });
    });
}

async function emplUpdate() {
  try {
    const selectEmplSql = `select
    a.id,
    CONCAT(a.first_name, " ", a.last_name) AS name,
    CONCAT(b.first_name, " ", b.last_name) AS manager,
    role.title as role,
    role.salary,
    department.name as department
  from employee AS a LEFT JOIN employee AS b
  on a.manager_id = b.id
  JOIN role on a.role_id = role.id
  JOIN department on role.department_id = department.id`;

    const [rows] = await db.promise().query(selectEmplSql);

    const choices = rows.map((employees) => ({
      name: `${employees.name}`,
      value: employees,
    }));

    const { employee } = await inquirer.prompt([
      {
        type: "list",
        message: "Choose an employee to update:",
        name: "employee",
        choices,
      },
    ]);
    const { roleId } = await inquirer.prompt([
      {
        type: "input",
        message: "Enter new role ID",
        name: "roleId"
      }
    ]);

    const updateEmplSql = `UPDATE employee SET ? WHERE ?;`;
    await db
      .promise()
      .query(updateEmplSql, [
        { role_id: roleId },
        { id: employee.id },
      ]);
    console.log("Update success.");
    return generalMenu();
  } catch (error) {
    console.log(error);
  }
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
          viewAllDept();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmploy();
          break;
        case "Add a Department":
          deptAdd();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmpl();
          break;
        case "Update an Employee Role":
          emplUpdate();
          break;
        default:
          db.end();
          console.log("Goodbye!");
      }
    });
}

console.log("Welcome to the Department Database!");
       generalMenu();