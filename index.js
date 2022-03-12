// Import and require express, inquirer, mysql2, dotenv
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL db, un, pw
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the teamtracer_db database.`)
);

// start inquirer
function init() {
  inquirer
    .prompt([
      {
        //questions here//
        name: "questions",
        type: "list",
        message: "What would you like to do?",
        choices: [
          {
            name: "View all employees",
            value: "viewEmp",
          },
          {
            name: "View all employee roles",
            value: "viewRole",
          },
          {
            name: "View all departments",
            value: "viewDep",
          },
          {
            name: "Add a new employee",
            value: "addEmp",
          },
          {
            name: "Quit",
            value: "quit",
          },
        ],
      },
    ])

    // promise
    .then((answers) => {
      // if/else or switch statements based on choices
      if (answers.questions === "viewEmp") {
        // call view employees function
        viewEmployees();
      } else if (answers.questions === "viewRole") {
        // call view roles function
        viewRoles();
      } else if (answers.questions === "viewDep") {
        // call view departments function
        viewDepartments();
      } else if (answers.questions === "addEmp") {
        // call addEmployee function
        addEmployee();
      }
    });
}

// view all employees option
function viewEmployees() {
  // db.query
  const sql = "SELECT * FROM employees";
  console.log("employees");
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}

// view all roles option
function viewRoles() {
  // db.query
  const sql = "SELECT * FROM roles";
  console.log("roles");
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}

// view departments option
function viewDepartments() {
  // db.query
  const sql = "SELECT * FROM departments";
  console.log("departments");
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}

// different functions for each user choice - choose your own adventure! (do these last, clear viewAllEmployees first)

// function addRole

// function addDepartment

// funtion addEmployee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
    ])

    // promise
    .then((answers) => {
      db.query("SELECT * FROM roles", function (err, results) {
        const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the employee's role?",
            choices: roles,
          })
          .then((role) => {
            db.query("SELECT * FROM employees WHERE manager_id is null", function (err, results) {
              const managers = results.map(({ id, first_name }) => ({
                name: first_name,
                value: id,
              }));
              inquirer
                .prompt({
                  type: "list",
                  name: "id",
                  message: "What is their manager's name?",
                  choices: managers,
                })
                .then((manager) => {
                  // inserts new employee data into employees table on SQL
                  db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, role.id, manager.id]);
                  init();
                });
            });
          });
      });
    });
}
// inquirer prompt to ask for first, last name
//.then query roles table
// inquirer prompt for choosing role
//.then prompt to ask who manager is

init();
