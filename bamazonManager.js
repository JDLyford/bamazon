// Required npms to run
var mysql = require("mysql");
var inquirer = require("inquirer");

// Initial connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Starting function
manage();
// Function that allows user to choose what they want to do
function manage() {
    inquirer.prompt([{
        name: "manage",
        type: "rawlist",
        message: "What would you like?",
        choices: ["Product for sale", "Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (ans) {
        // Switch to split program into four main areas and thier functions
        switch (ans.manage) {
            case "Product for sale":
                forSale();
                break;
            case "Low Inventory":
                lowInv();
                break;
            case "Add to Inventory":
                addInv();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }
    })
};

// Function that displays current products
function forSale() {
    showAll();
    connection.end();
};

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

// Displays all inventory that has a quantity less than 5
function lowInv() {
    var lowInvList = [];
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                lowInvList.push(res[i]);
            }
        }
        for (var i = 0; i < lowInvList.length; i++) {
            console.log("Id: " + lowInvList[i].id + " -- " +
                lowInvList[i].product_name + " -- " +
                lowInvList[i].department_name + " -- " +
                lowInvList[i].price + " -- " +
                lowInvList[i].stock_quantity);
        }
    })
    connection.end();
};

// Function that allows user to input quantity through prompts
function addInv() {
    var newAmount;
    var newInvt;
    showAll();
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([{
            name: "productIdN",
            type: "input",
            message: "What is the ID number?"
        }, {
            name: "amountAdd",
            type: "input",
            message: "How much would you like to add?"
        }]).then(function (ans) {
            // Adds input to current amount
            for (var i = 0; i < res.length; i++) {
                if (res[i].id == ans.productIdN) {
                    newAmount = res[i];
                    newInvt = parseInt(res[i].stock_quantity) + parseInt(ans.amountAdd);
                    console.log(newInvt);
                }
            }
            connection.query("UPDATE products SET ? WHERE ?", [
                { stock_quantity: newInvt }, { id: ans.productIdN }],
                function (err, res) {
                    if (err) throw err;
                    console.log("inventory amount changed");
                })
            connection.end();
        })
    })
};

// Function allowing user to add a new product through prompts
function addNewProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([{
            name: "pname",
            type: "input",
            message: "What is the product name?"
        }, {
            name: "dname",
            type: "input",
            message: "What is the department for this product?"
        }, {
            name: "price",
            type: "input",
            message: "What is the price for this product?"
        }, {
            name: "stock",
            type: "input",
            message: "What is the stock amount"
        }]).then(function (ans) {
            // Inserts new product into database
            connection.query("INSERT INTO products SET ?", {
                product_name: ans.pname,
                department_name: ans.dname,
                price: ans.price,
                stock_quantity: ans.stock
            }, function (err) {
                if (err) throw err;
                console.log("Product added");
                showAll();
                connection.end();
            })
        })
    })
};