# bieBay

Customer View (Minimum Requirement)

Created a MySQL Database called bieBay.
Then create a Table inside of that database called products.
The products table should have each of the following columns:

item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)
autographed (boolean)

The database with have 10 different products.

Then create a Node application called bieBayCustomer.js. The
application will first display all of the items available for sale.
Include the ids, names, prices, and where it is autographed of products for sale.                                                                                                                                                                                             
The app then prompts users with two messages.

The first prompt asks the user for the ID of the product they would like to buy.
The second prompt asks how many units of the product they would like
to buy.
Once the customer has placed the order, the application checks if
the store has enough of the product to meet the customer's request.

If not, the app logs Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, the application fulfills
the customer's order.

The database is then updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.
