//importing express module
const express = require('express');
const app = express();
const {InchargeMiddleware} = require('../Controllers/auth.controller');

//importing user schema module
const user = require("../Controllers/user.controller");

console.log("user routing");

app.post('/',user.find);
app.patch('/',user.update);
app.delete('/',InchargeMiddleware,user.delete);

//Exporting all routes
module.exports=app;