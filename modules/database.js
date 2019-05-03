var mongoose = require("mongoose");

var servidor = "localhost:27017";
var nombreBaseDatos ="proyectoEmilia";

class Database{
    constructor(){
        this.conectar();
    }


    conectar(){
        mongoose.connect(`mongodb://${servidor}/${nombreBaseDatos}`)
        .then(()=>{
            console.log("se conecto la base de datos")
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        });
    }
}


module.exports =new Database();