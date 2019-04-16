var express = require ("express");
var router = express.Router();
var flash = require("connect-flash");
var passport = require("passport");


var usuario = require("../models/usuario");
// const User = require('../models/usuario');

 

//obtener todos los usuarios
router.get("/",function(req,res){
    usuario.find()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//obtener un usuario en particular
router.get("/:id", function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    })

});

//peticion para guardar
router.post('/singup', function(req, res){
    var user= new usuario({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        correo:req.body.correo,
        contrasena:req.body.contrasena
    });

    console.log(JSON.stringify({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        correo:req.body.correo,
        contrasena:req.body.contrasena 
    }));

    user.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    })


});

//peticion para Actualizar el registro de un usuario
router.put("/:id", function(req,res){
    usuario.update(
        {_id:req.params.id},
        { 
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            correo:req.body.correo,
            contrasena:req.body.contrasena
         })
         .then(result=>{
             res.send(result);
         })   
         .catch(error=>{
             res.send(error);
         })

});

router.delete("/:id", function(req, res){
    usuario.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });

});


router.post('/signin', passport.authenticate('local', {
    failureFlash: true
  }));



module.exports =router;

// successRedirect: '/notes',
    // failureRedirect: '/users/signin',
    // failureFlash: true