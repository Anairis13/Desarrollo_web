var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha: Date,
        usuarioCreador: mongoose.Schema.Types.Mixed,
        carpetaPadre: String,
        extencion: Number,
        imagen: String       
    }
);

module.exports = mongoose.model('archivos', esquema);