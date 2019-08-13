var mysql = require('mysql');
var inquirer = require('inquirer');

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

  runStore();
 

  function runStore(){
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM products", function (err, result) {
          if (err) throw err;
          console.log(result);
          purchase();
        });
      });
  }

  function purchase(){
      inquirer.prompt(
          {
        name: "item",
        type: "input",
        message: "What item would you like to purchase? (please enter the item id)",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
          name:'quantity',
          type: 'input',
          message: "What is the quantity you would like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }).then(function(answer){
        connection.connect(function(err) {
            if (err) throw err;
            connection.query("SELECT product_name FROM products WHERE ?",{ item_id: answer.item }, function (err, result) {
              if (err) throw err;
              console.log(result);
            });
          });

      });
  }