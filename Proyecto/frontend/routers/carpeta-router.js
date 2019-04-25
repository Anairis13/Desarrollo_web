var express = require ("express");
var router = express.Router();
// var flash = require("connect-flash");
// var passport = require("passport");

var carpeta = require("../models/carpeta");


router.get("/",function(req,res){
    carpeta.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
router.get("/carpetaHija",function(req,res){
    carpeta.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.delete("/:id",function(req,res){
    carpeta.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
//peticion para guardar
router.post('/', function(req, res){
    var c = new carpeta({
        nombre:req.body.nombre,
        fecha: new(Date),
        usuarioCreador:{
            _id: req.body.usuarioCreador
        },
        carpetaPadre: req.body.carpetaPadre
        
    });

    console.log(JSON.stringify({
        nombre:req.body.nombre,
        fecha: new(Date),
        usuarioCreador:{
            _id: req.body.usuarioCreador
        },
        carpetaPadre:{
           _id: req.body.carpeta
        }
    }));

    c.save()
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
        }
        }).then(result=>{
        res.send(result);
        })
        .catch(error=>{
            res.send(result);
        })


});
router.get("/:id",function(req,res){
    carpeta.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

module.exports =router;
