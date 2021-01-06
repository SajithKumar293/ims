const express = require('express');
const app = express();
const User =require('../Models/user.model');

const log=console.log;

exports.find = (req,res) => {
    if (!req.body)
        return res.status(400)
                    .send({msg: "Not Specified any item to find!"});
    
    const id = req.body.id;

    User.findById(id)
            .then(data => {
                if(!data)
                    res.status(404)
                            .send({msg:"Not found user with specified id."});
                else res.send(data);
            })
                .catch(err => {
                    res.status(500)
                            .send({msg:err});
                });
}

exports.update = async(req,res)=>{
    //log("requesting a patch");
    if (!req.body)
        return res.status(400)
                    .send({msg: "Data to update is empty!"});
    try{
        const temp = await User.findById(id);
        if(req.body.name)
            temp.name = req.body.name;
        if(req.body.phone)
            temp.phone = req.body.phone;
        await temp.save();
        log("user details updated");
        res.status(200)
                .send({
                    msg:"Success"
                });
    }
    catch(err){
        res.status(500)
                .send({msg:err});
    }
}

exports.delete = (req,res) =>{
    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any item to delete!"});
        
        const id =req.body.id;

        User.findByIdAndRemove(id,{useFindAndModify:false})
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
}
