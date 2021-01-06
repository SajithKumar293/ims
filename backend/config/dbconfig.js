const mongoose = require('mongoose');
const url="mongodb+srv://Prudhvi:6302544@ims-cluster.webld.mongodb.net/ims?retryWrites=true&w=majority";
const con=mongoose.connection;
const log=console.log;
con.on('open',() => {
    log('Connected to mongodb:', con.host);
})
mongoose.connect(url,{useNewUrlParser:true , useUnifiedTopology: true,useCreateIndex:true});

module.exports = mongoose;