var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        apellido: String,
        correo : String,
        contrasena : String,
        foto : Buffer,
        carpetasCompartido: mongoose.Schema.Types.Mixed,
        archivosCompartido: mongoose.Schema.Types.Mixed
        
    }
);

module.exports = mongoose.model('usuarios', esquema);