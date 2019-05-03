var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha  : Date,
        usuarioCreador : String,
        carpetaPadre: String       
    }
);

module.exports = mongoose.model('Proyectos', esquema);