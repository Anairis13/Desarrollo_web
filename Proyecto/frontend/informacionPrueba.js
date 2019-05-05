db.usuarios.insertMany([
    {
            "_id" : ObjectId("5cceac3876476b243cd51913"),
            "carpetasCompartida" : [ ],
            "archivosCompartida" : [
                    ObjectId("5cceb14f333e2d00e40a71a1")
            ],
            "nombre" : "Ana",
            "apellido" : "Padilla",
            "correo" : "ana@yahoo.com",
            "contrasena" : "123",
            "tipoPlan" : "premiun",
            "__v" : 0,
            "numeroCuenta" : 23456
        },
        {
            "_id" : ObjectId("5cceafe7333e2d00e40a71a0"),
            "carpetasCompartida" : [
                    ObjectId("5cceacad76476b243cd51914"),
                    ObjectId("5cceacad76476b243cd51914"),
                    ObjectId("5cceb80f983c8b2190399980"),
                    ObjectId("5cceb80f983c8b2190399980")
            ],
            "archivosCompartida" : [ ],
            "nombre" : "Emilia",
            "apellido" : "Galvez",
            "correo" : "emilia@yahoo.com",
            "contrasena" : "123",
            "tipoPlan" : "gratis",
            "__v" : 0
        }

]);
// ------------------------------------------------
db.carpetas.insertMany([
    {
        "_id" : ObjectId("5cce98b53db1fe390c225f91"),
        "nombre" : "Carpetas Ana",
        "fecha" : ISODate("2019-05-05T08:03:01.694Z"),
        "usuarioCreador" : "5cce95f976c6f709386c8acb",
        "__v" : 0
},
{
        "_id" : ObjectId("5cce9e7cadcc5b1238f79444"),
        "nombre" : "Documento1",
        "fecha" : ISODate("2019-05-05T08:27:40.248Z"),
        "usuarioCreador" : "5cce9e10adcc5b1238f79443",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea301adcc5b1238f79451"),
        "nombre" : "Carpetas Ana",
        "fecha" : ISODate("2019-05-05T08:46:57.106Z"),
        "usuarioCreador" : "5ccea185adcc5b1238f79447",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea332adcc5b1238f79455"),
        "nombre" : "Ana",
        "fecha" : ISODate("2019-05-05T08:47:46.555Z"),
        "usuarioCreador" : "5ccea185adcc5b1238f79447",
        "carpetaPadre" : "5ccea301adcc5b1238f79451",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea342adcc5b1238f79456"),
        "nombre" : "documento",
        "fecha" : ISODate("2019-05-05T08:48:02.220Z"),
        "usuarioCreador" : "5ccea185adcc5b1238f79447",
        "carpetaPadre" : "5ccea332adcc5b1238f79455",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea55eadcc5b1238f7945b"),
        "nombre" : "Carpetas Ana",
        "fecha" : ISODate("2019-05-05T08:57:02.845Z"),
        "usuarioCreador" : "5ccea4ebadcc5b1238f79458",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea571adcc5b1238f7945c"),
        "nombre" : "Documento1",
        "fecha" : ISODate("2019-05-05T08:57:21.997Z"),
        "usuarioCreador" : "5ccea4ebadcc5b1238f79458",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea5bbadcc5b1238f79461"),
        "nombre" : "Expertos",
        "fecha" : ISODate("2019-05-05T08:58:35.218Z"),
        "usuarioCreador" : "5ccea4ebadcc5b1238f79458",
        "carpetaPadre" : "5ccea55eadcc5b1238f7945b",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea5c4adcc5b1238f79462"),
        "nombre" : "Ana",
        "fecha" : ISODate("2019-05-05T08:58:44.702Z"),
        "usuarioCreador" : "5ccea4ebadcc5b1238f79458",
        "carpetaPadre" : "5ccea5bbadcc5b1238f79461",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccea5d0adcc5b1238f79463"),
        "nombre" : "Jose",
        "fecha" : ISODate("2019-05-05T08:58:56.642Z"),
        "usuarioCreador" : "5ccea4ebadcc5b1238f79458",
        "carpetaPadre" : "5ccea5c4adcc5b1238f79462",
        "__v" : 0
},
{
        "_id" : ObjectId("5ccead97333e2d00e40a7193"),
        "nombre" : "Carpetas Ana",
        "fecha" : ISODate("2019-05-05T09:32:07.804Z"),
        "usuarioCreador" : "5cceac3876476b243cd51913",
        "carpetaPadre" : "5ccead8a333e2d00e40a7191",
        "__v" : 0
},
{
        "_id" : ObjectId("5cceb80f983c8b2190399980"),
        "nombre" : "Carpetas Ana",
        "fecha" : ISODate("2019-05-05T10:16:47.698Z"),
        "usuarioCreador" : "5cceac3876476b243cd51913",
        "__v" : 0
}
]);

// ----------------------------------------------------------
// archivos
db.archivos.insertMany([
{
    "_id" : ObjectId("5ccea639adcc5b1238f79464"),
    "fecha" : ISODate("2019-05-05T09:00:41.178Z"),
    "extencion" : 1,
    "codigoProyecto" : "5ccea545adcc5b1238f79459",
    "contenido" : " <h1>Hola este es un ejemplo</h1>\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5ccea639adcc5b1238f79465"),
    "fecha" : ISODate("2019-05-05T09:00:41.191Z"),
    "extencion" : 2,
    "codigoProyecto" : "5ccea545adcc5b1238f79459",
    "contenido" : "h1{\n    color:red;\n}\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5ccea639adcc5b1238f79466"),
    "fecha" : ISODate("2019-05-05T09:00:41.197Z"),
    "extencion" : 3,
    "codigoProyecto" : "5ccea545adcc5b1238f79459",
    "contenido" : "console.log(\"hola\")\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5ccea691adcc5b1238f79467"),
    "fecha" : ISODate("2019-05-05T09:02:09.709Z"),
    "extencion" : 1,
    "codigoProyecto" : "5ccea598adcc5b1238f7945f",
    "contenido" : " <h3>Hola Ingeniero</h3>\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5ccead81333e2d00e40a7190"),
    "nombre" : "ana.html",
    "fecha" : ISODate("2019-05-05T09:31:45.786Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "extencion" : 1,
    "imagen" : "../img/img-html.jpg",
    "__v" : 0
},
{
    "_id" : ObjectId("5ccead93333e2d00e40a7192"),
    "nombre" : "estilo.css",
    "fecha" : ISODate("2019-05-05T09:32:03.161Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "carpetaPadre" : "5ccead8a333e2d00e40a7191",
    "extencion" : 2,
    "imagen" : "../img/imgCss.png",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceadf5333e2d00e40a7194"),
    "fecha" : ISODate("2019-05-05T09:33:41.387Z"),
    "extencion" : 1,
    "codigoProyecto" : "5cceacb476476b243cd51915",
    "contenido" : " <h1>Hola este es un ejemplo</h1>\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceadf5333e2d00e40a7195"),
    "fecha" : ISODate("2019-05-05T09:33:41.397Z"),
    "extencion" : 3,
    "codigoProyecto" : "5cceacb476476b243cd51915",
    "contenido" : "console.log(\"hello\");\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceadf5333e2d00e40a7196"),
    "fecha" : ISODate("2019-05-05T09:33:41.409Z"),
    "extencion" : 2,
    "codigoProyecto" : "5cceacb476476b243cd51915",
    "contenido" : "h1{\n    color:red;\n}\n                \n            ",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceae27333e2d00e40a7197"),
    "fecha" : ISODate("2019-05-05T09:34:31.308Z"),
    "extencion" : 1,
    "codigoProyecto" : "5ccead67333e2d00e40a718e",
    "contenido" : " <h3>este es otro ejemplo</h3>\n                \n            ",
    "__v" : 0
}
])



// ----------------------------------------------------------
// proyectos
db.carpetas.insertMany([
{
    "_id" : ObjectId("5ccea6e0adcc5b1238f79468"),
    "nombre" : "proyecto3",
    "fecha" : ISODate("2019-05-05T09:03:28.959Z"),
    "usuarioCreador" : "5ccea4ebadcc5b1238f79458",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceacb476476b243cd51915"),
    "nombre" : "Proyecto1",
    "fecha" : ISODate("2019-05-05T09:28:20.603Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceacbb76476b243cd51916"),
    "nombre" : "proyecto2",
    "fecha" : ISODate("2019-05-05T09:28:27.323Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceafb1333e2d00e40a719d"),
    "nombre" : "proyecto4",
    "fecha" : ISODate("2019-05-05T09:41:05.895Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceafbe333e2d00e40a719f"),
    "nombre" : "proyecto4",
    "fecha" : ISODate("2019-05-05T09:41:18.273Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "carpetaPadre" : "5cceacad76476b243cd51914",
    "__v" : 0
},
{
    "_id" : ObjectId("5cceb7bf983c8b219039997f"),
    "nombre" : "proyecto4",
    "fecha" : ISODate("2019-05-05T10:15:27.284Z"),
    "usuarioCreador" : "5cceac3876476b243cd51913",
    "__v" : 0
}

]);







