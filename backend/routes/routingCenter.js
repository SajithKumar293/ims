//importing express module
const express = require('express');
const app = express();
const {InchargeMiddleware} = require('../Controllers/auth.controller');
console.log('At routing center');
const supplierRouter=require('./Supplier.route');
app.use('/supplier',InchargeMiddleware,supplierRouter);

const itemRouter=require('./Item.route');
app.use('/item',itemRouter);

const borrowRequestRouter = require('./Borrow.route');
app.use('/borrow',borrowRequestRouter);

const userRouter = require('./user.route');
app.use('/user',userRouter);

//Exporting all routes
module.exports=app;