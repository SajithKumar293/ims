//importing express module
const express = require('express');
const app = express();
const {InchargeMiddleware} = require('../Controllers/auth.controller');
//importing item schema module
const borrowRequest = require("../Controllers/borrow.controller");

console.log("At borrow request routing");

//Passing the appropriate controller to the request method received.
//To get holdings of particular user
app.post("/user",borrowRequest.find);
app.post("/create",borrowRequest.create);
//To get all borrow requests in the available lab
app.get("/lab",borrowRequest.findLab);
//To update the details of the item
app.patch("/approve",InchargeMiddleware,borrowRequest.approve);
//To delete borrow request in the database
app.delete("/",borrowRequest.delete);
app.patch("/",borrowRequest.update);
app.delete("/approved",InchargeMiddleware,borrowRequest.deleteEvenApproved);

//Exporting all routes
module.exports=app;