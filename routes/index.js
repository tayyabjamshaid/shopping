var express = require('express');
var multer=require('multer');
var path=require('path');
var modd=require("../modules/shop");
var router = express.Router();
var fi=modd.find({});
router.use(express.static(__dirname+'/public'));
var sttorage =multer.diskStorage({
  destination:'./public/uploads',
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
  }
})
var upl=multer({
  storage:sttorage
}).single('filee')


/* GET home page. */
router.post('/upload',upl, function(req, res, next) {
  var successs =req.file.filename+"File Uploaded";
  res.render('upload',{succ:successs})
  })
router.get('/upload', function(req, res, next) {
 
    res.render('upload')
    
  })

router.get('/', function(req, res, next) {
  fi.exec(function(err,data){
    if (err) throw error;
    res.render('index',{title:"Shopping Records",records:data})
    
  })
});
router.post('/', function(req, res, next) {
  var detail=new modd({
    item:req.body.item,
    price:req.body.price,
    qty:req.body.qua,
    grYears:req.body.gryy,
    area:req.body.area,
    total:parseInt(req.body.qua)*parseInt(req.body.price)
  })
  detail.save(function(err){
  if (err) throw error;
  fi.exec(function(err,data){
    if (err) throw error;
    res.render('index',{title:"Shopping Records",records:data})
    
  })
})});
router.post('/search', function(req, res, next) {
  var flname=req.body.item;
  var flprc=req.body.pr;
  var flar=req.body.ar;
  if(flname!='' && flprc!='' && flar!='') {
    var resPara={$and:[{area:flar}
    ,{$and:[{item:flname},{$and:[{price:flpr}]}]}]}}
    
    else if(flname!='' && flprc=='' && flar==''){
      var resPara={$and:[{item:flname}]}
    } else if(flname=='' && flprc!='' && flar=='') {
    var resPara=  {$and:[{price:flpr}]}
    }else if(flname=='' && flprc=='' && flar!=''){
     var resPara= {$and:[{area:flar}]}
    }else{
      var resPara={}
    }
    var fii=modd.find(resPara);
        
  fii.exec(function(err,data){
    if (err) throw error;
    res.render('index',{title:"Shopping Records",records:data})
    
  })
});
router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  var fiii=modd.findByIdAndDelete(id);
  fiii.exec(function(err){
    if (err) throw error;
    res.redirect('/');
    
  })
});

router.get('/edit/:id', function(req, res, next) {
  var id =req.params.id;
  var edd=modd.findById(id);

  edd.exec(function(err,data){
    if (err) throw error;
    res.render('edit',{title:"Shopping Records",records:data})
    
  })
});
router.post('/update', function(req, res, next) {
  var eddd=modd.findByIdAndUpdate(req.body.id,{
    item:req.body.item,
    price:req.body.price,
    qty:req.body.qua,
    grYears:req.body.gryy,
    area:req.body.area,
    total:parseInt(req.body.qua)*parseInt(req.body.price)
  })
  eddd.exec(function(err,data){
    if (err) throw error;
   res.redirect('/');
    
  })
});
module.exports = router;
