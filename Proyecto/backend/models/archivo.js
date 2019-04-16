var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha: Date,
        usuarioCreador: mongoose.Schema.Types.Mixed,
        carpetaPadre: mongoose.Schema.Types.Mixed,
        extencion: Number       
    }
);

module.exports = mongoose.model('archivos', esquema);