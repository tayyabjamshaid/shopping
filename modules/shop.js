var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true});
var conn =mongoose.connection;
var sch =mongoose.Schema({
    item:String,
    price:Number,
    qty:Number,
    grYears:Number,
    area:String,
    total:Number
})
var mod =mongoose.model('orders',sch);
module.exports=mod;
//A Complete Update,Delete,Filter,Insert Program