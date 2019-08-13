var mysql = require('mysql');
var inqurier = require('inqurier');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "MaryAnna1!",
    database: "bamazon"
  });

  function 