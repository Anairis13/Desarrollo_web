var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var database = require("./modules/database.js");
var usuarioRouter= require('./routers/usuario-router');
var carpetaRouter = require("./routers/carpeta-router");
var archivoRouter = require("./routers/archivo-router");



var app= express();
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/usuarios",usuarioRouter);
app.use("/carpetas", carpetaRouter);
app.use("/archivos", archivoRouter);









app.listen(3333, function(){
 console.log("Servidor Levantado");
});
