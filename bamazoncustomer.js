var mysql = require('mysql');
var inquirer = require('inquirer');

//create connection
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


//function to start the store
function runStore() {
  connection.connect(function (err) {
    if (err) throw err;
    //list items
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        console.log(
          "Item id: " +
          result[i].item_id +
          " || Name: " +
          result[i].product_name +
          " || Price: " +
          result[i].price +
          " || Stock: " +
          result[i].stock_quantity
        );

      }
      purchase();
    });
  });
}

//function to ask user what to purchase
function purchase() {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "What item would you like to purchase? (please enter the item id)",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: 'quantity',
      type: 'input',
      message: "What is the quantity you would like to purchase?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]).then(function (answer) {
      //get information of choosen item
      connection.query("SELECT product_name,stock_quantity,price FROM products WHERE ?", { item_id: answer.item }, function (err, result) {
        if (err) throw err;

        //check if there is enough quantity to order
        if (result[0].stock_quantity < answer.quantity) {
          console.log('not enough items in stock for order to go through');
        } else {
          var total = answer.quantity * result[0].price;
          var minusQuantity = result[0].stock_quantity - parseInt(answer.quantity);
          console.log(`you purchased ${answer.quantity} ${result[0].product_name}(s) it will cost you ${total}`);
          connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: minusQuantity }, {
            item_id: answer.item
          }]),
            console.log('quantities have been updated after order has gone through');
        }
      });
    });
}

function addInventory(){
  
}