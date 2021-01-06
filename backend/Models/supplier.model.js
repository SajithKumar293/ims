const mongoose = require('../config/dbconfig');
const log=console.log;

const Address = new mongoose.Schema({
    doorNo:{
        type : String,
        required : true
    },
    street:{
        type : String,
        required : true
    },
    area:{
        type:String
        //required : true
    },
    landmark:String,
    pincode:{
        type : Number,
        required : true
    }
});
log("Created address sub schema");

const supplierSchema = new mongoose.Schema({

    supplierName: {
        type: String,
        required: true
    },
    items:[{
        type : mongoose.Schema.Types.ObjectId,ref:'item'
    }],
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:[Address]
},{toJSON:{virtuals:true}},{collection:'supplier'});

log("Create new Supplier Schema");

const supplierModel = mongoose.model('supplier',supplierSchema);
log("Created supplier Model");
module.exports = supplierModel;