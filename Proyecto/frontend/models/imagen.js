var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        creador: mongoose.Schema.Types.Mixed
        
    }
);

module.exports = mongoose.model('imagenes', esquema);