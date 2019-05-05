var express = require ("express");
var session = require("express-session");
var mongoose = require("mongoose");
var router = express.Router();

var usuario = require("../models/usuario");

 

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
        contrasena:req.body.contrasena,
        tipoPlan: req.body.tipoPlan,
        codigoCv: req.body.codigoCv,
        
        numeroCuenta:req.body.numeroCuenta,
        carpetasCompartida:req.body.carpetasCompartida
    });

    console.log(JSON.stringify({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        correo:req.body.correo,
        contrasena:req.body.contrasena,
        tipoPlan: req.body.tipoPlan,
        codigoCv: req.body.codigoCv,
        numeroCuenta:req.body.numeroCuenta,
        carpetasCompartida:req.body.carpetasCompartida
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
    usuario.updateOne(
        {_id:req.params.id},
        {$set:{ 
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            correo:req.body.correo,
            contrasena:req.body.contrasena,
            tipoPlan: req.body.tipoPlan,
            codigoCv: req.body.codigoCv,
            numeroCuenta:req.body.numeroCuenta,
            carpetasCompartida:req.body.carpetasCompartida
         }})
         .then(result=>{
             res.send(result);
         })   
         .catch(error=>{
             res.send(error);
         })

});
router.put("/plan/:id", function(req,res){
    usuario.updateOne({_id:req.params.id},  {$set:{tipoPlan: req.body.tipoPlan, codigoCv: req.body.codigoCv, numeroCuenta:req.body.numeroCuenta}})
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
 
router.put("/:id/:idCarpetas/carpetas", function(req,res){  
    usuario.updateOne(
        {_id:req.params.id},
        { $push: {carpetasCompartida:mongoose.Types.ObjectId(req.params.idCarpetas)}})

         .then(result=>{
             res.send(result);
            //  console.log(result);
         })   
         .catch(error=>{
             res.send(error);
         })
})
router.put("/:id/:idArchivos/archivos", function(req,res){  
    usuario.updateOne(
        {_id:req.params.id},
        { $push: {archivosCompartida:mongoose.Types.ObjectId(req.params.idArchivos)}})

         .then(result=>{
             res.send(result);
            //  console.log(result);
         })   
         .catch(error=>{
             res.send(error);
         })
})

router.get("/:id/cmpCarpetas",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"carpetas",
                localField: "carpetasCompartida", 
                foreignField:"_id",
                as:"compartidos"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        { //Obtener solo el atributo de contactos
            $project:{compartidos:1}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

router.get("/:id/cmpArchivos",function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:"archivos",
                localField: "archivosCompartida", 
                foreignField:"_id",
                as:"cmpArchivos"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        { //Obtener solo el atributo de contactos
            $project:{cmpArchivos:1}
        }
    ])
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


