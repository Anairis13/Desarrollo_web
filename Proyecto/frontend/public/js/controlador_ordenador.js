var idUsuario = "5cbcf8a66bb373ec9730a72b";
var idCarpeta=0;
var ruta=[0];

$(document).ready(function(){
     perfil();
    agregarCarpeta();
    agregarArchivos();

});

$(document).on("contextmenu", function(e){  
    return false;
});

$("#principal").mousedown(function(e) {			
    if (e.button == 2){
        $("#menuCapa").css("top", e.pageY - 20);
        $("#menuCapa").css("left", e.pageX - 20);
        $("#menuCapa").show('fast');			
    }else{
        $("#menuCapa").hide('fast');
        hide();
        limpiar();
        
    }
});

$("#actFoto").click(function(){
    $("#foto").css("display","block");
    $("#guardarFoto").css("display","block");
    $("#actFoto").css("display","none");
    

});

$("#nuevaCarpeta").click(function(e){
    $("#nombreCarpeta").css("display","block");
});

$("#nuevoArchivo").click(function(e){
    $("#nombreArchivo").css("display","block");
});

function hide(){
$("#nombreCarpeta").css("display","none");
$("#nombreArchivo").css("display","none");
}
  
function limpiar(){
    document.getElementById("myForm").reset();

}

$("#btn-actPerfil").click(function(){
    var data = $("#formulario2").serialize();
    console.log(data);
    $.ajax({
        method:"PUT",
        url: "http://localhost:3334/usuarios/"+ idUsuario ,
        datatype: "JSON",
        data: data,
        success: function(res){
           console.log("usuario actualizado");

        },
        error: function(error){
            console.log(error);
        }       
    })
});

$("#btn-proyectos").click( function(){
    $.ajax({
        url:"proyecto.html",
        datatype:"html",
        success: function(data){
            $("#principal").html(data);
        }
    })
  
});

function agregarCarpeta(){
    $.ajax({
        url:"/carpetas",
        method: "GET",
        dataType:"json",
        success: function(res){
            for(var  i=0; i<res.length;i++){
                if (res[i].carpetaPadre == null) {
                    divCarpeta(res[i]);
                }else{
                    console.log("tiene padre")
                }
            }
        },
        error: function(res){
            console.log(res);
            
        }
    })

};

function agregarArchivos(){    
    $.ajax({
        url:"/archivos",
        method: "GET",
        dataType:"json",
        success: function(res){
            for(var  i=0; i<res.length;i++){
                if (res[i].carpetaPadre == null) {
                    divArchivos(res[i]);
                }else{
                    console.log("tiene padre");
                }
            }
        },
        error: function(res){
            console.log(res);
            
        }
    })

};
function perfil(){
    $.ajax({
        method:"GET",
        url: "/usuarios/"+ idUsuario,
        datatype: "JSON",
        success: function(res){
            for (var i = 0; i < res.length; i++) {
               if(res[i]._id==idUsuario){
                $("#actualizar").append(
                        `<input type="text" class="form-control separacion1" name=nombre value="${res[i].nombre}">
                        <input type="text" class="form-control separacion1" name=apellido value="${res[i].apellido}"> 
                        <input type="text" class="form-control separacion1" name=correo value="${res[i].correo}">
                        <input type="text" class="form-control separacion1" name=contrasena value="${res[i].contrasena}">                
                        `
                    )
               }
            }
        },
        error: function(error){
            console.log(error);
        }
       
    })
}
$("#btn-guardarCar").click(function(){
    var data= "&nombre="+$("#txt-Carpeta").val();        
    if($("#txt-Carpeta").val()==""){

    }else if(idCarpeta == 0){
        $.ajax({
            url:"/carpetas",
            method: "Post",
            data: data, 
            dataType:"json",               
            success: function(res){
                console.log("registro Guardado");
                
                divCarpeta(res);
                $("#menuCapa").hide('fast');
                limpiar();
                hide();
                
            },
            error: function(res){
                console.log(res);
                
            }
        })

    }else{
        console.log(idCarpeta); 
        $.ajax({
            url:"/carpetas",
            method: "Post",
            data: data + "&carpetaPadre="+ idCarpeta, 
            dataType:"json",               
            success: function(res){
                console.log("registro Guardado");

                divCarpeta(res);
                $("#menuCapa").hide('fast');
                limpiar();
                hide();
                
            },
            error: function(res){
                console.log(res);
                
            }
        })
    }
    
});

$("#btn-guardarArc").click(function(){
    console.log("hola");
    var extencion= 0;
    var imagen= "";
    var data= "&nombre="+$("#txt-nombre").val();
    var campo = $("#txt-nombre").val();
    if($("#txt-nombre").val() !==""){
        var partes= campo.split(".");
        parte = partes[1].toLowerCase();

        if (parte=="html") {
            extencion=1;
            imagen = '../img/img-html.jpg';

        }else if(parte=="css"){
            extencion=2;
            imagen = '../img/imgCss.png';
        }else if(parte=="js"){
            extencion=3;
            imagen = '../img/js.png';
        }else{
            return;
        }
    if(idCarpeta==0){
        $.ajax({
            url:"/archivos",
            method: "Post",
            data: data +"&extencion="+extencion+"&imagen="+imagen, 
            dataType:"json",               
            success: function(res){
                console.log("registro Guardado");
                divArchivos(res);
                $("#menuCapa").hide('fast');
                limpiar();
                hide();
            },
            error: function(res){
                console.log(res);
                
            }
        })

    }else{
        $.ajax({
            url:"/archivos",
            method: "Post",
            data: data +"&extencion="+extencion+"&imagen="+imagen +"&carpetaPadre="+idCarpeta, 
            dataType:"json",               
            success: function(res){
                console.log("registro Guardado");
                divArchivos(res);
                $("#menuCapa").hide('fast');
                limpiar();
                hide();
            },
            error: function(res){
                console.log(res);
                
            }
        })
    }
    }
});

function abrirCarpeta(id) {
    idCarpeta=0;
    idCarpeta= id;    
    ruta.push(id)
    document.getElementById('raiz').innerHTML="";
    $.ajax({
        url:"/carpetas",
        method: "Get",
        dataType:"Json",
        success: function(res){           
            for (var i = 0; i < res.length; i++) {
                if(res[i]._id==id){
                    document.getElementById("ruta").innerHTML+=
                    `<span id="${res[i].fecha}">${res[i].nombre}/</span>
                    `; 
                    // ruta.push(res[i]);
                }
                if (res[i].carpetaPadre == idCarpeta) {                
                   divCarpeta(res[i]);
                }
            }
        },
        error:function(res){
            console.log(res)
        } 
    })
    $.ajax({
        url:"/archivos",
        method: "Get",
        dataType:"Json",
        success: function(res){           
            for (var i = 0; i < res.length; i++) {
                if (res[i].carpetaPadre == idCarpeta) {                
                   divArchivos(res[i]);
                }
            }
        },
        error:function(res){
            console.log(res)
        } 
    })
console.log(ruta);
}

function buscarEliminar(id){
  var listaCarpetas=[];
  var listaArchivos=[];
  var padre=id;
  listaCarpetas.push(padre);
  console.log(padre);

$.ajax({
url:"/archivos",
method: "Get",
dataType:"Json",
success: function(res){
    for (var i = 0; i < res.length; i++) {
        if(!(res[i].carpetaPadre=="")){
            if(res[i].carpetaPadre==padre){
                padre = res[i].carpetaPadre;
                listaArchivos.push(res[i]._id)  
            }
        }
    }
    eliminarArchivos(listaArchivos);
},
error:function(res){
    console.log(res);
}
})  
$.ajax({
    url:"/carpetas",
    method: "Get",
    dataType:"Json",
    success: function(res){
        for (var i = 0; i < res.length; i++) {
           if(!(res[i].carpetaPadre=="")){
                if(res[i].carpetaPadre==padre){
                    padre = res[i].carpetaPadre;
                    listaCarpetas.push(res[i]._id)  
                }
           }
        }
        eliminarCarpetas(listaCarpetas,padre);
    },
    error:function(res){
        console.log(res);
    }
})


}
function eliminarArchivos(listaArchivos){
    // console.log(listaEliminar);
    for (var i = 0; i < listaArchivos.length; i++) {
        $.ajax({
            url:"/archivos/" + listaArchivos[i],
            method: "Delete",
            dataType:"Json",
            success: function(res){
                
            },
            error:function(res){
                console.log(res);
            }
        })
    }
}
function eliminarCarpetas(listaCarpetas,padre){
    // console.log(listaEliminar);
    for (var i = 0; i < listaCarpetas.length; i++) {
        $.ajax({
            url:"/carpetas/" + listaCarpetas[i],
            method: "Delete",
            dataType:"Json",
            success: function(res){
                
            },
            error:function(res){
                console.log(res);
            }
        })
    }
     $("#"+ listaCarpetas[0]).remove();
}


function eliminarArc(idArchivo){
    $.ajax({
        url:"/archivos/" + idArchivo,
        method: "Delete",
        dataType:"Json",
        success: function(res){
            $("#"+ idArchivo).remove();
        },
        error:function(res){
            console.log(res);
        }
    })

}

function atras(){
    // console.log(ruta);
    document.getElementById('raiz').innerHTML="";
    if(!(ruta==0)){
        var ultimo = ruta[ruta.length-1];
        console.log(ultimo)
        ruta.pop();
        //  for (var i = 0; i < ruta.length; i++) {            
            $.ajax({
                url:"/carpetas" ,
                method: "Get",
                dataType:"Json",
                success: function(res){
                    for (var i = 0; i < res.length; i++) { 
                        if (!(ultimo==0)) {                      
                         if(res[i]._id==ultimo){
                            document.getElementById(res[i].fecha).remove();
                        }}
                        if (res[i]._id == ruta[ruta.length-1]) {                
                           divCarpeta(res[i]);
                        }
                    }
                    
                },
                error:function(res){
                    console.log(res)
                } 
            })
            $.ajax({
                url:"/archivos",
                method: "Get",
                dataType:"Json",
                success: function(res){           
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].carpetaPadre == ruta[ruta.length-1]) {                
                           divArchivos(res[i]);
                        }
                    }
                },
                error:function(res){
                    console.log(res)
                } 
            })  
            console.log(ruta);
        // }
        
    }
    if(ruta==0){  
        document.getElementById("ruta").innerHTML="";     
        agregarArchivos();
        agregarCarpeta();
    }
    
}

function divCarpeta(res){
    document.getElementById('raiz').innerHTML+=
    ` 
    <div class="col-lg-2 col-sm-4 col-xs-6 cuadro" id="${res._id}">
                    <div class="col-lg-3 Dinamico">
                        <div class="dropdown1" >
                            <button class="dropbtn1 form-control botonDinamico" ><i class="fas fa-ellipsis-v"></i></i></button>
                            <div class="dropdown-content1">
                                <div class="container">
                                    <a href="#" class="letra nounderline" onclick="abrirCarpeta('${res._id}')" ><p><span> <i class="fas fa-folder-plus"></i> Abrir</span></p></a> 
                                    <a href="#" class="letra nounderline"><p><i class="fas fa-user-friends"></i> Compartir</span></p></a>
                                    <a href="#" class="letra nounderline"><p><span> <i class="fas fa-edit"></i> Actualizar</span></p></a>
                                    <a href="#" class="letra nounderline" onclick="buscarEliminar('${res._id}')"><p><i class="far fa-trash-alt"></i></span> Eliminar</span></p></a>

                                </div>
                            </div>
                        </div> 
                        </div>
                    <div class="col-lg-11">                                      
                        <img src="img/C_W.png" id="archivo">
                    </div>                                   
                    <div class="col-lg-12 nombre" >
                        <span>${res.nombre}</span>
                    </div>
                </div>
            </div> `;
}
function divArchivos(res){
    document.getElementById('raiz').innerHTML+=
    ` 
    <div class="col-lg-2 col-sm-4 col-xs-6 cuadro" id="${res._id}">
    <div class="col-lg-3 Dinamico">
            <div class="dropdown1" >
                <button class="dropbtn1 form-control botonDinamico" ><i class="fas fa-ellipsis-v"></i></i></button>
                <div class="dropdown-content1">
                    <div class="container">
                        <a href="#" class="letra nounderline"><p><i class="fas fa-user-friends"></i> Compartir</span></p></a>
                        <a href="#" class="letra nounderline"><p><span> <i class="fas fa-edit"></i> Actualizar</span></p></a>
                        <a href="#" class="letra nounderline" onclick="eliminarArc('${res._id}')"><p><i class="far fa-trash-alt"></i></span> Eliminar</span></p></a>

                    </div>
                </div>
            </div> 
        </div> 
        <div class="col-lg-11">                                      
            <img src="${res.imagen}" id="archivo">
        </div>                              
        <div class="col-lg-12 nombre">
            <span>${res.nombre} </span>
        </div>
    </div>`;
}






