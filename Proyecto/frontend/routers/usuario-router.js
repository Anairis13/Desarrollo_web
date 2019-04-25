var express = require ("express");
var session = require("express-session");
var router = express.Router();


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

router.post("/login",function(req, res){

    usuario.find({correo:req.body.correo, contrasena:req.body.contrasena})
    .then(data=>{
        if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
            req.session.codigoUsuario = data[0]._id;
            req.session.correoUsuario =  data[0].correo;
            // req.session.codigoTipoUsuario = data[0].tipoUsuario;
            res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
        }else{
            res.send({status:0,mensaje:"Credenciales inválidas"});
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 
    /*if (req.body.usuario == 'jperez' && req.body.contrasena=='asd.456'){
        req.session.codigoUsuario = 1;
        req.session.correoUsuario =  'jperez@gmail.com';
        req.session.codigoTipoUsuario = '2';
    }*/
});





module.exports =router;


