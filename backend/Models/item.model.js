const mongoose = require('../config/dbconfig');
const log = console.log;
delete mongoose.connection.models['item'];
const itemSchema = new mongoose.Schema({
    itemName:{
        type : String,
        required : true,
        unique : true
    },
    labName:{
        type : String,
        required : true
    },
    totalQuantity:{
        type : Number,
        required : true
    },
    quantityBorrowed:{
        type : Number,
        default : 0
    },
    quantityDamaged:{
        type : Number,
        default : 0
    },
    availableQuantity:{
        type : Number,
        required : true,
        min:0
    }
},{collection:'item'});
log("Created item Schema");

 const itemModel = mongoose.model('item',itemSchema);
/* const newRequest=new itemModel({
    itemName:"item 0",
    labName: "Nila campus",
    totalQuantity: 200,
    availableQuantity: 0,
});
newRequest.save()*/

 log("Created item model");
 module.exports = itemModel;