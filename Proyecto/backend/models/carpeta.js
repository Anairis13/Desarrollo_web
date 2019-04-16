var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha: Date,
        usuarioCreador: mongoose.Schema.Types.Mixed,
        carpetaPadre: mongoose.Schema.Types.Mixed       
    }
);

module.exports = mongoose.model('carpetas', esquema);