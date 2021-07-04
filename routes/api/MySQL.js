// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "bodybuilding_db",
  password:"password7117"
});

// simple query
connection.query(
  'SELECT * FROM `users` WHERE `first_name` = "David"',
  function (err, results, fields) {
    if(err) throw err
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
