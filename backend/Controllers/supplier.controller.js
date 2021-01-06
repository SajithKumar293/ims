const supplier = require('../Models/supplier.model');
const log=console.log;

exports.findAll = async(req, res) => {
    log('At supplier find all');
    await supplier.find({}).populate('items').exec((err,supplier)=>{
        if(err)
            res.status(500)
                    .send({msg:err});
        res.send(supplier);
    });
};

exports.find = async(req, res) => {
    if (!req.body)
        return res.status(400)
                    .send({msg: "Not Specified any supplier to find!"});
    log("At find");
    const id= req.body.id;
    item.findById(id)
            .populate('items')
                .then(data => {
                    if(!data)
                        res.status(404)
                                .send({msg:"Not found supplier with specified id."});
                    else res.send(data);
                })
                    .catch(err => {
                        res.status(500)
                                .send({msg:err});
                    });
};

exports.create = async(req,res)=>{

    if(!req.body)
        res.status(400)
                .send({msg:"No data provided to create!"});

    log("At create supplier");
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
        res.status(200).send("Success");
    }
    catch(err){
        log(err);
        res.status(500)
                .send(err);
    };
};

exports.delete = (req,res)=>{
    if (!req.body)
        return res.status(400)
                        .send({msg: "Not Specified any supplier to delete!"});
    log("At delete");
    const id =req.body.id;

    supplier.findByIdAndRemove(id,{useFindAndModify:false})
                .then(data=>{
                    if(!data)
                    res.status(404)
                            .send({msg:"No data found!"});
                res.status(200)
                    .send({msg:"Success"});
                })
}