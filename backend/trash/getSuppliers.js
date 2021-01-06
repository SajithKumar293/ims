const express = require('express');
const app = express();
const supplier =require('../Models/supplier.model');

const log=console.log;

app.post('/', async(req, res) => {
    log('At supplier');
        await supplier.find({}).populate('items').exec((err,supplier)=>{
            if(err) res.send(err);
            res.json(supplier);
        });
    });
  module.exports = app;