var express = require('express');
var hbs = require("hbs");
var app= express();

app.use(express.static("public"));

// app.use(express.static( __dirname + '/public'));
// app.set('view engine', 'hbs');

// app.get('/', (res,req) => {
//     res.render('ordenador');

// });








app.listen(3333, function(){
 console.log("Servidor Levantado");
});
