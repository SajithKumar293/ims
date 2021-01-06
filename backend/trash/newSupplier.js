const express = require('express');
const app = express();
const supplier =require('../Models/supplier.model');
const log=console.log;

//app.use(express.json());
app.post('/',async(req,res)=>{
    var addresses=[];
    for(var i=0;i<req.body.address.length;i++){
        addresses[i]={
            doorNo: req.body.address[i].doorNo,
            street: req.body.address[i].street,
            area : req.body.address[i].area,
            landmark : req.body.address[i].landmark,
            pincode : req.body.address[i].pincode,
        }
    }
    const newSupplier=new supplier({
        supplierName: req.body.supplierName,
        phone: req.body.phone,
        email: req.body.email,
        address: addresses,
        items : req.body.items,
    });
    try{
        const temp= await newSupplier.save()
        log(temp);
        res.send("Success");
    }
    catch(err){
        log(err);
        res.send(err);
    }
})
module.exports=app;
