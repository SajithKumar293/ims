const User = require('../Models/user.model');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');
//const fetch = require('node-fetch');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { response } = require('express');
const client = new OAuth2Client("1062439136371-dvg9finj9laaeh900cclughstqo32175.apps.googleusercontent.com");

exports.googleController = (req, res)=>{
    const {idToken} = req.body;
    
    client.verifyIdToken({idToken, audience: "1062439136371-dvg9finj9laaeh900cclughstqo32175.apps.googleusercontent.com"}).then(response => {
        
        const {email_verified, name, email} = response.payload;
        if(email_verified){
            User.findOne({email}).exec((err,user) => {
                if(err){
                    console.log("first"+err);
                    return res.status(400)
                                .send({msg:err});                
                }
                else{
                    if(user){
                        const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRET,{algorithm: 'HS256', expiresIn: '7d'});
                          const { _id, email, name, role } = user;
                          return res.send({
                            token,
                            user: { _id, email, name, role }
                          });
                    }
                    else{
                        let newUser = new User({name,email});
                        
                        newUser.save((err, data) => {
                            if(err){
                                console.log("sec"+err);
                                return res.status(400)
                                            .send({msg:err});                
                            }
                            const token = jwt.sign({ _id: data._id,role: data.role }, process.env.JWT_SECRET,{algorithm: 'HS256', expiresIn: '7d'});
                            const { _id, email, name, role} = data;
                            return res.send({
                                token,
                                user: { _id, email, name, role}
                            });
                        });
                    }
                }
            })
        }
        else{
            console.log("third"+err);
            return res.status(400)
                        .json({
                            msg: 'Google login failed!, Try again :)'
                        });
        }
    });    
};

exports.acquireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'] 
});

exports.userCheck = (req,res,next) =>{
    User.findById(req.user._id).exec((err,user)=>{
        if(err)
            return res.status(400)
                            .send({
                                msg:err
                            });
        else if(!user)
            return res.status(400)
                            .send({
                                msg:"Invalid User!"
                            });
    });
};

exports.InchargeMiddleware = (req,res,next) =>{
    if(req.user.role!='SUPPLIER' && req.user.role!='ADMIN')
        res.status(401).send({
            msg:"Not Authorized user"
        });
};
