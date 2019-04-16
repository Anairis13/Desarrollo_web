var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var database = require("./modules/database.js");
// var flash = require("connect-flash");
// var passport= require("passport");
// var LocalStrategy = require('passport-local').Strategy;
var usuarioRouter= require('./routers/usuario-router');
var carpetaRouter = require("./routers/carpeta-router");
var carpetaRouter = require("./routers/archivo-router");

var cors = require("cors");
var app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/usuarios",usuarioRouter);
app.use("/carpetas", carpetaRouter);
app.use("/archivos", carpetaRouter);

// mmiddlewares
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


// require('./passport/passport')(passport);







app.listen(3334, function(){
    console.log("Backend en linea");
});






