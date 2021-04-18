//importing express module
const express = require('express');
const app = express();

//importing item schema module
const item = require("../Controllers/item.controller");

console.log("At item routing");

//Passing the appropriate controller to the request method received.
//To get all items available
app.get("/all",item.findAll);
//To get all items in the cart
app.post("/cart",item.findCart);
//To get all items in the available lab
app.get("/lab",item.findLab);
//To get details of particular item
app.post("/",item.find);
//To create new item entry in the database
app.post("/create",item.create);
//To update the details of the item
app.patch("/",item.update);
//To delete particular or single item entry in the database
app.delete("/",item.delete);
//Extra delete request handling for deleting multiple items.
app.delete("/delete",item.deleteAllSpecified);

//Exporting all routes
module.exports=app;