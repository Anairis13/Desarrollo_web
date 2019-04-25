var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha: Date,
        usuarioCreador: mongoose.Schema.Types.Mixed,
        carpetaPadre: String,
        estado: Boolean       
    }
);

module.exports = mongoose.model('carpetas', esquema);