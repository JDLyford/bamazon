// Required npms
var mysql = require("mysql");
var inquirer = require("inquirer");

// Setting up the connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Starts the program
begin();

// Start function
function begin() {
    // Calls function to display products
    showAll();
    // Sets loc to reduce code
    var loc = "SELECT*FROM bamazon.products";
    var myuserReq;
    connection.query(loc, function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Input id that you would like to purchase"
            }, {
                name: "quantity",
                type: "input",
                message: "How many do you want?"
            }
        ]).then(function (userReq) {
            // Checks to see if valid reques
            for (var i = 0; i < results.length; i++) {
                if (results[i].id == userReq.id) {
                    myuserReq = results[i];
                    
                    // If the request is greater than stock then backout of function and restart
                    if (results[i].stock_quantity < userReq.quantity) {
                        console.log("We out, stop asking");
                        begin()
                    } else if (results[i].stock_quantity >= userReq.quantity) {
                        // If the request is less than stock then update data and return results from functions
                        price(userReq.quantity, myuserReq.price);
                        purchase(results[i].stock_quantity, userReq.quantity, userReq.id);
                    }
                }
            }
        })
    })
};

// Basic function to display the result of user purchase
function price(quan, p) {
    var total = quan * p;
    console.log("each cost $" + p);
    console.log("you want to buy this " + quan + "many");
    console.log("Your TOTAL is: $" + total);
};

// Updates the database and ends the connection
var newQuan = 0;
function quanUpdate(a, b, c) {
    newQuan = a - b;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{ stock_quantity: newQuan }, { id: c }],
        function (err) {
            if (err) throw err;
            console.log("purchase complete");
        })
    connection.end();
};

// Displays all products from the database
function showAll() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        console.log("---------------------------------------------");
        for (var i = 0; i < results.length; i++) {
            console.log("Id: " + results[i].id + " -- " + results[i].product_name + " -- "
                + results[i].department_name + " -- " + results[i].price + "-- " + results[i].stock_quantity);
        }
    });
}

// Confirmation function to proceed with the purchase and the finalize the transaction
function purchase(a, b, c) {
    inquirer.prompt([{
        name: "yesorno",
        type: "rawlist",
        message: "Do you want to make this purchase?",
        choices: ["YES", "NO"]
    }]).then(function (ans) {
        // Runs another function to update quanty if Yes or restarts if no
        if (ans.yesorno.toUpperCase() === "YES") {
            quanUpdate(a, b, c);
        } else {
            begin();
        }
    });
};