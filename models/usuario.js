var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre  : String,
        apellido: String,
        correo : String,
        contrasena : String,
        foto : Buffer,
        tipoPlan: String,
        codigoCV: Number,
        numeroCuenta: Number,
        carpetasCompartida: Array,
        archivosCompartida: Array
        
    }
);

module.exports = mongoose.model('usuarios', esquema);