//importing express module
const express = require('express');
const app = express();

//importing supplier schema module
const supplier = require("../Controllers/supplier.controller");

console.log("At supplier routing");

//Passing the appropriate controller to the request method received.
//To get all supplier available
app.get("/all",supplier.findAll);
//To get details of particular supplier
app.post("/",supplier.find);
//To create new supplier entry in the database
app.post("/create",supplier.create);
//To update the details of the supplier
//app.patch("/",supplier.update);
//To delete particular or single item entry in the database
app.delete("/",supplier.delete);

//Exporting all routes
module.exports=app;