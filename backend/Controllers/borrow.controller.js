const express = require('express');
const app = express();
const borrowRequest =require('../Models/borrow.model');
const item = require('../Models/item.model');

const log=console.log;

exports.create = (req,res) => {
    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any borrow request to create!"});
    log("At create");
    let products = req.body.products;
    for (var i=0; i<products.length; i++ ){
        const newRequest=new borrowRequest({
            userId:req.body.userId,
            itemName: products[i].name,
            labName: req.body.labName,
            quantity: products[i].qty,
            dueDate: req.body.dueDate,
        });
    
        newRequest.save()
                .then(()=>{
                    res.status(200)
                            .send({msg:"Success"});
                })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).send({msg:err});
                    })
    }
};

exports.find = (req,res)=>{
    if (!req.body)
        return res.status(400)
                    .send({msg: "Not Specified user to get borrowing"});
    log("borrow request finding by userid");
    const id=req.body.id;
    borrowRequest.find({userId:id, submitted:false})
                    .then(data=>{console.log(data);res.send(data)})
                    .catch(err=>{
                        res.status(500)
                                .send({
                                    msg:err
                                });
                    });
};

exports.findLab = (req,res)=>{
    if (!req.body)
        return res.status(400)
                    .send({msg: "Not Specified lab to get borrowing requests"});
    log("borrow request finding by labname");

    const name=req.body.labName;
    borrowRequest.find({labName:name})
                    .then(data=>res.send(data))
                    .catch(err=>{
                        res.status(500)
                                .send({
                                    msg:err
                                });
                    });
};

exports.approve = async(req,res)=>{
    if (!req.body)
        return res.status(400)
                    .send({msg: "Not Specified borrow request to approve"});
    log("approving");
    try{
        const id=req.body.id;
        const temp = await borrowRequest.findById(id);
        const temp1=await item.find({itemName:temp.itemName});
        log(temp);
        if(!temp.approved && temp1.availableQuantity>=temp.quantity){
            temp1.availableQuantity=temp1.availableQuantity-temp.quantity;
            temp1.quantityBorrowed=temp1.quantityBorrowed+temp.quantity;
            await temp1.save();
            temp.approved=true;
            await temp.save();
            log("approved");
            res.status(200)
                    .send({msg:"Success"});
        }
        else if(!temp.approved)
            res.status(400).send({
                msg:"Already Approved"
            });
        else if(temp1.availableQuantity>=temp.quantity)
            res.status(400).send({
                msg:"Quantity Not available"
            });
    }
    catch(err){
        res.status(500)
                .send({msg:err});
    }
};

exports.update = async(req,res)=>{
    if (!req.body)
    return res.status(400)
                .send({msg: "Not Specified borrow request to update"});
    
    try{
        const temp=await borrowRequest.findById({_id:req.body.id});
        const temp1=await item.find({itemName:temp.itemName});
        
        if(req.body.quantity && temp1.availableQuantity>=req.body.quantity)
            temp.quantity=req.body.quantity;
        else res.status(400).status({
            msg:"Quantity not availble"
        })        
    }
    catch(err){
        res.status(500)
                .send({msg:err});
    }
};

exports.delete = (req,res)=>{
    if (!req.body)
    return res.status(400)
                .send({msg: "Not Specified borrow request to delete"});
    
    borrowRequest.findById(id,(err,data)=>{
        if(!data.approved){
            data.remove();
            res.status(200)
                    .send({
                        msg:"Success"
                    });
        }
        else res.status(401)
                    .send({
                        msg:"Not Authenticated user to delete"
                    });
    });
};

exports.deleteEvenApproved = (req,res)=>{

    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any borrow request to delete!"});
    log("deleting borrow request");
    
    const id =req.body.id;

    borrowRequest.findByIdAndRemove(id,{useFindAndModify:false})
            .then(data =>{
                if(!data)
                    res.status(404)
                            .send({msg:"No data found!"});
                res.status(200)
                    .send({msg:"Success"});
        })
        .catch(err =>{
            res.status(500)
                .send({msg:err});
        });
};