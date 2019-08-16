var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "userSelect",
            type: "list",
            message: "Please select an action",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", 'Add New Product', 'Exit']
        })
        .then(function (answer) {
            switch (answer.userSelect) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    break;

                case "Add New Product":
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
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


    });
}

function lowInventory() {
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 6', function (err, result) {
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


    });
}
