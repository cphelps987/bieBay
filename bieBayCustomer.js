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
    showProduct();
});


//display products here!
//console.log("id | product_name |  department_name  |  price | stock_quanity  | autographed"); --decided not to use this
function showProduct(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err)
            throw err;
        //console.log(results);
        //console.log(results[0].id);

        for (var i = 0; i < results.length; i++) { //MAKE SURE IT IS AN 'i' NOT 1!!!
            //console.log(results);
            //console.log(results[i].id);
            console.log("id: " + results[i].id + " | " + "Product: " + results[i].product_name + " | " + "Price: "+ results[i].price + " | " + "Autographed: (1-yes 0-no) " + results[i].autographed);
            //console.log("id: " + results[i].id + " | " + "Product Name: " + results[i].product_name + " | " + "Price: "+ results[i].price);
            console.log("----------------------------------------------------------------------------------------------------------");
        }
        search();
    });


}

function startStop(results) {
    inquirer.prompt([
        {
            name: "next",
            type: "confirm",
            message: "Want to buy more?"
        }
    ]).then(function (response) {
        //console.log(response);
        if (response.next === true) {
            search();

        }
        else {
            console.log("Came back soon!");
        }
    });

}

function search() {
    inquirer.prompt([
        {
            name   : "id",
            type   : "input",
            message: "What is the ID of the product you are looking for?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },

        {
            name: "quantity",
            type: "input",
            message: "How many units of the product they would like to buy",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {

        connection.query("SELECT ? FROM products", {
                id: answer.item,
                //product_name: answer.product_name,
                //department_name: answer.department_name,
                //price: answer.price,
                stock_quantity: answer.stock_quantity,
                //autographed: answer.autographed
            },

            function(err) {
                if (err) throw err;
                //console.log(answer);
                check(answer);
            }

        ); //end of query

    });//end of then function

}//end of search ID

//Once the customer has placed the order,
// it will check if the store has enough of the product to meet the customer's request.

function check(answer) {

    connection.query("SELECT id, stock_quantity, price FROM products WHERE ?",[{id: answer.id}], function (err, results){
        //add in the where for it to only look for the id!!!!!!

        if (err) throw err;

        //console.log ("SQ \n", results); //make sure you do the right tick for the new line
        //console.log(typeof (results));
        //console.log (results[1].stock_quantity);
        //console.log(answer);
        //console.log(typeof(answer));
        //console.log(answer.quantity);
        //console.log("answer id ",answer.id);



        for (var i = 0; i < results.length; i++) {

            quantityHave = results[i].stock_quantity;
            idHave = results[i].id;
            price =results[i].price;
            //console.log("price ",price);
            //console.log("QH", quantityHave);
            //console.log("ID", idHave);
            //
        }//end of for loop
        if (quantityHave < answer.quantity) {
            console.log("Insufficient quantity - " + quantityHave + " currently in stock");
            /*console.log("answer ", answer.quantity);
             console.log("stock ", quantityHave);
             console.log("ID", idHave);*/
            //startStop();
            restart();
        }
        else if (quantityHave >= answer.quantity) {
            console.log("Happy to assist you in this order");
            /*console.log("answer ", answer.quantity);
             console.log("stock ", quantityHave);
             console.log("ID", idHave);*/
            total();
            purchase();

        }
        else {
            console.log("Incorrect ID");
            search();
        }


        function total() {
            var sum = parseInt(answer.quantity) * price;
            console.log("TOTAL: $", sum);

        }

    });//end of connect.query

    function left(){
        var quantityLeft = quantityHave - parseInt(answer.quantity);
        //console.log("quantity left ", quantityLeft);
        connection.query("UPDATE products SET stock_quantity = ? WHERE ?",[{stock_quantity: quantityLeft}, {id: answer.id}], function (err, results){
            if (err) throw err;


        })
    }

}//end of check function

function purchase() {
    inquirer.prompt([
        {
            name: "buy",
            type: "confirm",
            message: "Would you like to make this purchase?",

        }
    ]).then(function (answer) {
        // console.log(answer);
        if (answer.buy === true) {
            console.log("Thank you for your purchase")
            startStop();
        }
        else {
            console.log("Come back soon!");
            startStop();
        }
    });

}


function restart() {
    inquirer.prompt([
        {
            name: "restart",
            type: "confirm",
            message: "Would you like enter a new quantity?",


        }
    ]).then(function (answer) {
        if (answer.restart === true) {
            search();
        }
        else {
            startStop();
        }
    });

}
