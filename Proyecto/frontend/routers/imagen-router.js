var express = require ("express");
var mongoose = require("mongoose");
var imagen = require("../models/imagen");
var router = express.Router();
var fs = require("fs");




router.post("/imagenes", function(req,res){
    console.log(req.files.archivo);
    // var extension = req.files.originalFilenam.split(".").pop();
    // console.log(extension);
   var data = {
       creador:req.body._id
   } 
   var i =new imagen(data);
   i.save(function(err){
        
        if(!err){
            // console.log("imagen");
           fs.extra(req.files.imagen.path, "public/imagenes/"+ imagen.name)
        
       }else{
           console.log(archivo);
           res.send(err);
       }
   })
   
})



module.exports =router;