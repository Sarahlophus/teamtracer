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
        //initial user navigation questions here//
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
            name: "Add a new job role",
            value: "addRole",
          },
          {
            name: "Add a new department",
            value: "addDept",
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
      } else if (answers.questions === "addRole") {
        // call addRole function
        addRole();
      } else if (answers.questions === "addDept") {
        // call addDept function
        addDept();
      } else {
        quit();
      }
    });
}
// different functions for each user choice - choose your own adventure:

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

// funtion to add new employee to teamtracer_db(employees table)
function addEmployee() {
  // inquirer prompt to ask for new employee's first, last name
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

    // promise to resolve linking to roles table
    .then((answers) => {
      db.query("SELECT * FROM roles", function (err, results) {
        const roles = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        // inquirer prompt to ask for new employee's role
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the employee's role?",
            choices: roles,
          })
          // promise to resolve assigning employee to manager
          .then((role) => {
            db.query("SELECT title FROM roles WHERE id = ?", role.id, function (err, results) {
              const roleTitle = results[0].title;
              // conditional: if new employee is a manager, add them to db with a manager ID of 'null'
              if (roleTitle.includes("Manager")) {
                // inserts new employee data into employees table on SQL
                db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, role.id, null]);
                console.log(`${answers.firstName} ${answers.lastName} has been added to your Employee List!`);
                init();
              } else {
                // conditional: if new employee is not a manager, assign them to current list of managers
                db.query("SELECT * FROM employees WHERE manager_id is null", function (err, results) {
                  const managers = results.map(({ id, first_name }) => ({
                    name: first_name,
                    value: id,
                  }));
                  // inquirer prompt to ask who manager is
                  inquirer
                    .prompt({
                      type: "list",
                      name: "id",
                      message: "What is their manager's name?",
                      choices: managers,
                    })
                    // promise to insert new employee's info into employee table
                    .then((manager) => {
                      // inserts new employee data into employees table on SQL
                      db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, role.id, manager.id]);
                      console.log(`${answers.firstName} ${answers.lastName} has been added to your Employee List!`);
                      init();
                    });
                });
              }
            });
          });
      });
    });
}

// function to add new role to teamtracer_db(roles table)
function addRole() {
  // inquirer promp to as for new role's title, salary,
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the job title of this new role",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary of this new role",
      },
    ])

    // promise to resolve linking to departments table
    .then((answers) => {
      db.query("SELECT * FROM departments", function (err, results) {
        const depts = results.map(({ id, dept_name }) => ({
          name: dept_name,
          value: id,
        }));
        // inquirer prompt to ask for new role's department
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "Select the department for this new role",
            choices: depts,
          })
          // promise to insert new role info into roles table
          .then((department) => {
            // inserts new role data into roles table on SQL
            db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answers.title, answers.salary, department.id]);
            console.log(`${answers.title} has been added to your Job Roles!`);
            init();
          });
      });
    });
}

// function addDepartment
function addDept() {
  // inquirer promp to ask for new department's name,
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Enter the name of this new department",
      },
    ])

    // promise to insert new department info into department table
    .then((answers) => {
      // inserts new department data into roles table on SQL
      db.query("INSERT INTO departments (dept_name) VALUES (?)", [answers.deptName]);
      console.log(`${answers.deptName} has been added to your Departments!`);
      init();
    });
}

// function to quit Inquirer
function quit() {
  process.exit();
}

// start Inquirer program
init();
