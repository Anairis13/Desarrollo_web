var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require('cookie-parser');
var database = require("./modules/database.js");
// var formidable = require("express-form-data");
// var imagenRouter = require('./routers/imagen-router')
var usuarioRouter= require('./routers/usuario-router');
var carpetaRouter = require("./routers/carpeta-router");
var archivoRouter = require("./routers/archivo-router");
var proyectoRouter = require("./routers/proyecto-router");



var app= express();
app.use(cookieParser());
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
// app.use(formidable.parse({ keepExtensions: true }));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/usuarios",usuarioRouter);
app.use("/carpetas", carpetaRouter);
app.use("/archivos", archivoRouter);
// app.use("/imagenes", imagenRouter);
app.use("/proyectos", proyectoRouter);





// -sessiones
app.get('/login/:correo',function(req, res){
    req.session.correo = req.params.correo;
    res.send("Se guardo la variable de sesion");
});

app.get('/obtener-sesion',function(req, res){
    res.send({correo:req.session.correo});
});


app.get('/destruir-sesion',function(req,res){
    req.session.destroy();
    res.send("Session eliminada");
});

// app.get("/ordenado.html",verificarSesion,function(req,res){
    
//     res.end();
// });
// -------------------------------------------seguridad sesion
// function verificarSesion(req,res,next){
//     if(req.session.correo){
//         return next();
//     }else{
//         res.redirect("/index.html");
//         /*res.send("Acceso No Autorizado");*/
//         res.end();
//     }
// }




// cockies
app.get('/guardar-cookie/:codigoUsuario',function(req, res){
    res.cookie("usuario", req.params.codigoUsuario);
    res.send("Se guardo la cookie"+ req.cookies.usuario);
});
app.get('/obtener-cookie',function(req, res){
    res.send("Cookie guardada: " + req.cookies.usuario);
});







app.listen(3333, function(){
 console.log("Servidor Levantado");
});
