var express = require ("express");
var router = express.Router();

var proyecto = require("../models/proyecto");


router.get("/",function(req,res){
    proyecto.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
router.get("/:id",function(req,res){
    proyecto.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.delete("/:id",function(req, res){
    proyecto.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});
//peticion para guardar
router.post('/', function(req, res){
    var a = new proyecto({
        nombre:req.body.nombre,
        fecha: new(Date),
        usuarioCreador:req.body.usuarioCreador,
        carpetaPadre:req.body.carpetaPadre        
    });

    console.log(JSON.stringify({
        nombre:req.body.nombre,
        fecha: new(Date),
        usuarioCreador:req.body.usuarioCreador,
        carpetaPadre:req.body.carpetaPadre,
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
    proyecto.update({
        _id:req.params.id},{
        nombre:req.body.nombre,
        usuarioCreador:req.body.usuarioCreador,
        carpetaPadre:req.body.carpetaPadre        
        }).then(result=>{
        res.send(result);
        })
        .catch(error=>{
            res.send(result);
        })


});



module.exports =router;