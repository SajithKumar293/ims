const express = require('express');
const app = express();
const item =require('../Models/item.model');

const log=console.log;

exports.findAll = (req, res) => {
    log("At findall");
    item.find({})
            .then(data=>{
               res.send(data);
            })
                .catch(err => {
                    res.status(500)
                        .send({msg: err});
                });
};

exports.find = (req,res) =>  {
    if (!req.body)
        return res.status(400)
                    .send({msg: "Not Specified any item to find!"});
    log("At find");
    const id = req.body.id;

    item.findById(id)
            .then(data => {
                if(!data)
                    res.status(404)
                            .send({msg:"Not found item with specified id."});
                else res.send(data);
            })
                .catch(err => {
                    res.status(500)
                            .send({msg:err});
                });
};

exports.findLab = (req,res) =>  {
    if (!req.params)
        return res.status(400)
                    .send({msg: "Not Specified any lab to find items!"});
    log("At findlab");
    const lab=req.query.labName;
    log(req.query);
    item.find({labName:lab})
            .then(data => {
                if(!data)
                    res.status(404)
                            .send({msg:"Not found any items in the specified lab."});
                else res.send(data);
            })
                .catch(err => {
                    res.status(500)
                            .send({msg:err});
                });
};

exports.update = async(req,res)=>{
    //log("requesting a patch");
    if (!req.body)
        return res.status(400)
                    .send({msg: "Data to update is empty!"});
    log("At update");
    try{
        const temp=await item.findById({_id:req.body.id});
        log(temp);
        if(req.body.itemName){
            temp.itemName=req.body.itemName;
        }
        if(req.body.labName){
            temp.labName=req.body.labName;
        }
        if(req.body.totalQuantity){
            temp.totalQuantity=req.body.totalQuantity;
        }
        if(req.body.availableQuantity){
            temp.availableQuantity=req.body.availableQuantity;
        }
        if(req.body.quantityBorrowed){
            temp.quantityBorrowed=req.body.quantityBorrowed;
        }
        if(req.body.quantityDamaged){
            temp.quantityDamaged=req.body.quantityDamaged;
        }
        if(temp.totalQuantity!=temp.quantityBorrowed+temp.quantityDamaged+temp.availableQuantity)
            res.status(400)
                    .send({msg:"Quantity is not listed properly."});
        
        else{
            await temp.save();
            log("patch saved");
            res.status(200)
                    .send({msg:"Success"});
        }        
    }
    catch(err){
        res.status(500)
                .send({msg:err});
    }
};

exports.delete = (req,res)=>{

    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any item to delete!"});
    log("At delete");
    const id =req.body.id;

    item.findByIdAndRemove(id,{useFindAndModify:false})
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

exports.deleteAllSpecified = (res,req) => {
    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any item to delete!"});
    log("At del spec");
    const id = req.body.id;
    item.deleteMany({_id:id})
        .then(() => {
            res.status(200).send({
                msg:"Success",
                deletedCount:data.deletedCount
            });
        })
        .catch(err=>{
            res.status(500).send({msg:err});
        });
};

exports.create = (req,res) => {
    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any item to delete!"});
    log("At create");
    const newitem=new item({
        itemName: req.body.itemName,
        labName: req.body.labName,
        totalQuantity: req.body.totalQuantity,
        availableQuantity: req.body.availableQuantity ? req.body.availableQuantity:req.body.totalQuantity,
        quantityDamaged: req.body.quantityDamaged ? req.body.quantityDamaged : 0
    });
    
    newitem.save()
                .then(()=>{
                    res.status(200)
                            .send({msg:"Success"});
                })
                    .catch(err=>{
                        res.status(500).send({msg:err});
                    })
};