var express = require ("express");
var session = require("express-session");
var router = express.Router();
var usuario = require("../models/usuario");


router.post("/login",function(req, res){

    usuario.find({correo:req.body.correo, contrasena:req.body.contrasena})
    .then(data=>{
        if (data.length==1){
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
    
});


module.exports =router;
