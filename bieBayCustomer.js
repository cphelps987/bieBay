/*Challenge #1: Customer View (Minimum Requirement)
Create a MySQL Database called bieBay.
Then create a Table inside of that database called products.
The products table should have each of the following columns:

item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)
autographed (boolean)

Populate this database with around 10 different products. (i.e. Insert "mock"
data rows into this database and table).

Then create a Node application called bieBayCustomer.js. Running this
application will first display all of the items available for sale.
Include the ids, names, and prices of products for sale.                                                                                                                                                                                             The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like
to buy.
Once the customer has placed the order, your application should check if
your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill
the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase. */

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    //port: 3360, -- it doesn't like this!!!
    //username
    user: "root",
    //pw blank - leave blank!
    password: "",
    database: "bieBay"
});
//console.log("connection", connection);

//checking connection of mysql
connection.connect(function (err) {
   if (err)
        throw err;
    //console.log("Connected!");
    console.log("Connected as id " + connection.threadId);
    //showProduct();
    //searchId();
});


//display products here!
//console.log("id | product_name |  department_name  |  price | stock_quanity  | autographed"); --decided not to use this
function showProduct(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err)
            throw err;
        //console.log(results);
        //console.log(results[0].id);

       // for (const i = 0; 1 < results.length; i++) {
          //console.log(results[i].id);
          // console.log(results[i].id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quanity + " | " + results[i].autographed);
         // var choiceArray = [];
          //console.log("id: " + results[i].id + " | " + "Product Name: " + results[i].product_name + " | " + "Price: "+ results[i].price);
          //console.log("------------------------------------------------------------");
          //console.log(results);
        //}
        //return choiceArray;
        var choicesArray = [];
        for (var i =0; i < results.length; i++) {
            choicesArray.push("Product Name: " + results[i].product_name);
            }
            return choicesArray;
    });


}
showProduct();
/*
function searchId() {
  inquirer.prompt([
        {
         type   : "input",
         name   : "id",
         message: "What is the ID of the product you are looking for?"
         //validate: function(value) {
           /!* if (isNaN(value) === false) {
                return true;
            }
            return false;
            }*!/
         },
      {
         name: "quantity",
         type: "input",
         message: "How many units of the product they would like to buy"
         }
  ]).then(function (answer) {
        // if (answer.id ===)
  });
        //console.log(inquirer.name[0]);
 }*/



//insert into table
/*connection.query("INSERT INTO `products` SET `product_name` = 'Mock3' ", function (err, result) {
    if (err) throw err;
    console.log("Insert Mock");
});*/

/*
connection.query("UPDATE `products` SET `product_name` = 'Mock' ", function (err, result) {
 if (err) throw err;
 console.log("Insert Mock");
 });

connection.query("UPDATE `products` SET `department_name` = 'Mock3' ", function (err, result) {
    if (err) throw err;
    console.log("Insert Mock2");
});*/
