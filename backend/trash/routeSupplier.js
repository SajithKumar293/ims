const express = require('express');
const app = express();

const getSuppliers = require('./getSuppliers');
app.use('/getSuppliers',getSuppliers);
const newSupplier = require('./newSupplier');
app.use('/newSupplier',newSupplier);
module.exports=app;