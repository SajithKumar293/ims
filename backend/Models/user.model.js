const mongoose = require('../config/dbconfig');
const log = console.log;
delete mongoose.connection.models['user'];
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    role:{
        type:String,
        enum:['user','SUPPLIER','ADMIN'],
        default: 'user'
    }
},{collection:'user'});
log('Created user schema');

const userModel = mongoose.model('user',userSchema);
log('Created user model');
module.exports = userModel;