var express = require("express");
var bodyParser = require("body-parser");
var database = require("./modules/database.js");
var usuarioRouter= require('./routers/usuario-router');
var cors = require("cors");
var app= express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/usuarios",usuarioRouter);




app.listen(3334, function(){
    console.log("Backend en linea");
});






