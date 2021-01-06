const mongoose = require('../config/dbconfig');
const log = console.log;
delete mongoose.connection.models['borrow'];
const borrowRequestSchema = new mongoose.Schema({
    userId: {
        required: true,
        type : mongoose.Schema.Types.ObjectId, ref:'user'
    },
    itemName: {
        required: true,
        type : String
    },/*
    labName:{
        type:String,
        required:true
    },*/
    quantity: {
        required:true,
        type: Number
    },
    approved:{
        type : Boolean,
        default: false,
        required: true
    },
    dueDate:{
        type : Date,
        required:true
    },
    submitted:{
        type: Boolean,
        default: false
    },
    submittedDate:{
        type: Date
    }
},{collection : 'borrow'});
log("Created borrow request schema");

const borrowRequestModel = mongoose.model('borrow',borrowRequestSchema);
log("Created borrow request model");

module.exports = borrowRequestModel;