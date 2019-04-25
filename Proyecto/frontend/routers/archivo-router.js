var express = require ("express");
var router = express.Router();
// var flash = require("connect-flash");
// var passport = require("passport");

var archivo = require("../models/archivo");


router.get("/",function(req,res){
    archivo.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
router.get("/:id",function(req,res){
    archivo.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.delete("/:id",function(req, res){
    archivo.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
//peticion para guardar
router.post('/', function(req, res){
    var a = new archivo({
        nombre:req.body.nombre,
        fecha: new(Date),
        usuarioCreador:{
            _id: req.body.usuarioCreador
        },
        carpetaPadre:req.body.carpetaPadre,
        extencion:req.body.extencion,
        imagen:req.body.imagen
    });

    console.log(JSON.stringify({
        nombre:req.body.nombre,
        fecha: new(Date),
        usuarioCreador:{
            _id: req.body.usuarioCreador
        },
        carpetaPadre:{
           _id: req.body.carpetaPadre
        },
        extencion:req.body.extencion,
        imagen:req.body.imagen
    }));

    a.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    })


});

router.put('/:id', function(req, res){
    carpeta.update({
        _id:req.params.id},{
            nombre:req.body.nombre,
        usuarioCreador:{
            _id: req.body.usuarioCreador
        },
        carpetaPadre:{
           _id: req.body.carpetaPadre
        },
        extencion: req.body.extencion,
        imagen:req.body.imagen
        }).then(result=>{
        res.send(result);
        })
        .catch(error=>{
            res.send(result);
        })


});



module.exports =router;