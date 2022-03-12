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
            name: "view all employees",
            value: "viewEmp",
          },
          {
            name: "view roles",
            value: "viewRole",
          },
          {
            name: "view all departments",
            value: "viewDep",
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
  });
}

// view all roles option
function viewRoles() {
  // db.query
  const sql = "SELECT * FROM roles";
  console.log("roles");
  db.query(sql, (err, rows) => {
    console.table(rows);
  });
}

// view departments option
function viewDepartments() {
  // db.query
  const sql = "SELECT * FROM departments";
  console.log("departments");
  db.query(sql, (err, rows) => {
    console.table(rows);
  });
}

// different functions for each user choice - choose your own adventure! (do these last, clear viewAllEmployees first)

// funtion createEmployee
// inquirer prompt to ask for first, last name
//.then query roles table
// inquirer prompt for choosing role
//.thn ask who manager is

init();
