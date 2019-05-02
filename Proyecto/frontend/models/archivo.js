var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        fecha: Date,
        usuarioCreador: String,
        carpetaPadre: String,
        extencion: Number,
        imagen: String,
        codigoProyecto: String,
        contenido:String       
    }
);

module.exports = mongoose.model('archivos', esquema);