var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha: Date,
        usuarioCreador: String,
        carpetaPadre: String,
        estado: Boolean       
    }
);

module.exports = mongoose.model('carpetas', esquema);