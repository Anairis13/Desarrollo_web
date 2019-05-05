var idUsuario = 0;
var idCarpeta=0;
var ruta=[0];
var idCompartir=0;
$(document).ready(function(){
    obtenerSesion();
    
});



function obtenerSesion() {
    $.ajax({
        url:"/obtener-sesion",
        dataType:"json",
        method:"get",
        success: function(res){
            // console.log(res.correo);
                $.ajax({
                    url:"/usuarios",
                    method: "get",
                    datatype:"json",
                    success: function(respuesta){
                        for (var i = 0; i < respuesta.length; i++) {
                            if (res.correo==respuesta[i].correo) {
                               idUsuario= respuesta[i]._id;
                               
                               perfil();
                               agregarArchivos();
                               agregarCarpeta();
                               usuarios();
                               agregarProyectos();  
                        
                            }
                            
                        }
                    }
                })
        },
        error: function(error){
            console.error(error);
        }

    })
}

function usuarios() {
    $.ajax({
        url:"/usuarios",
        method:"get",
        datatype:"json",
        success:function(res){
            for (var i = 0; i < res.length; i++) {
                if(!(res[i]._id==idUsuario))
                $("#cmp-usuarios").append(
                    `<option value="${res[i]._id}">${res[i].nombre}</option>`
                );
                
            }
        }


    })
}

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
$("#nuevoProyecto").click(function(e){
    $("#nombreProyecto").css("display","block");
});

function hide(){
$("#nombreCarpeta").css("display","none");
$("#nombreArchivo").css("display","none");
$("#nombreProyecto").css("display","none");
}
  
function limpiar(){
    document.getElementById("myForm").reset();

}

$("#btn-actPerfil").click(function(){
    var data = $("#formulario2").serialize();
    console.log(data);
    $.ajax({
        method:"PUT",
        url: "/usuarios/"+ idUsuario ,
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

function agregarProyectos(){
    $.ajax({
        url:"/proyectos",
        method:"get",
        datatype:"json",
        success: function(res){
            for(var  i=0; i<res.length;i++){
                if(res[i].usuarioCreador==idUsuario){
                if (res[i].carpetaPadre == null) {                   
                    divProyecto(res[i]);
                }else{
                    console.log("tiene padre");
                }
            }
            }
        }
    })
}


var cantidad=[];
$("#btn-guardarPc").click( function(){
    // console.log($("#txt-proyecto").val());
    $.ajax({
        url:"/proyectos",
        method:"get",
        datatype:"json",
        success:function(res){
            for (let i = 0; i < res.length; i++) {
                if(res[i].usuarioCreador==idUsuario){
                    cantidad.push(res[i]._id);
                }
                
            }
        }
    })
    // console.log(cantidad.length);
    if (!(idCarpeta==0)){
    var data= "&nombre="+ $("#txt-proyecto").val()+ "&usuarioCreador="+ idUsuario+ "&carpetaPadre="+ idCarpeta;
    $.ajax({
        url:"/usuarios",
        method:"get",
        datatype:"json",
        success: function(res){
            // console.log(res);
            for (let i = 0; i < res.length; i++) {
                if((res[i]._id==idUsuario)){
                    if((res[i].tipoPlan=="gratis")){
                        if((cantidad.length<2)){
                            // console.log("plan gratis cambialo!" + idUsuario);
                            // cantidad.push(res[i]._id);
                                $.ajax({
                                    url:"/proyectos",
                                    method:"Post",
                                    datatype:"Json",
                                    data: data,
                                    success: function(res){              
                                        divProyecto(res);
                                        $("#menuCapa").hide('fast');
                                        limpiar();
                                        hide();
                                    },
                                    error:function(error){
                                        console.error(error)
                                    }
                                }) 

                        }                                   
                        else{
                                Push.create("Alerta", {
                                body: "Lo sentimos su numero de proyectos ha sido limitado, pasate a Premiun",
                                // icon: '../img/logoV10_fondo_transparente.png',
                                timeout: 4000,
                                onClick: function () {
                                    window.focus();
                                    this.close();
                                }
                            });
                            console.log("ya no puedes guardar"); 
                        }

                    }else if(res[i].tipoPlan=="premiun"){
                        $.ajax({
                            url:"/proyectos",
                            method:"Post",
                            datatype:"Json",
                            data: data,
                            success: function(res){              
                                divProyecto(res);
                                $("#menuCapa").hide('fast');
                                limpiar();
                                hide();
                            },
                            error:function(error){
                                console.error(error)
                            }
                        }) 

                    }
                    
                }
                
            }
             
            
        }
    })
    }else{
        var data= "&nombre="+$("#txt-proyecto").val()+ "&usuarioCreador="+ idUsuario;
        $.ajax({
            url:"/usuarios",
            method:"get",
            datatype:"json",
            success: function(res){
                // console.log(res);
                for (let i = 0; i < res.length; i++) {
                    if((res[i]._id==idUsuario)){
                        if((res[i].tipoPlan=="gratis")){
                            if((cantidad.length<2)){
                                // console.log("plan gratis cambialo!" + idUsuario);
                                // cantidad.push(res[i]._id);
                                    $.ajax({
                                        url:"/proyectos",
                                        method:"Post",
                                        datatype:"Json",
                                        data: data,
                                        success: function(res){              
                                            divProyecto(res);
                                            $("#menuCapa").hide('fast');
                                            limpiar();
                                            hide();
                                        },
                                        error:function(error){
                                            console.error(error)
                                        }
                                    }) 

                            }else{
                                Push.create("Alerta", {
                                    body: "Lo sentimos su numero de proyectos ha sido limitado, pasate a Premiun",
                                    // icon: '../img/logoV10_fondo_transparente.png',
                                    timeout: 4000,
                                    onClick: function () {
                                        window.focus();
                                        this.close();
                                    }
                                });
                            }
                        }else if(res[i].tipoPlan=="premiun"){
                            $.ajax({
                                url:"/proyectos",
                                method:"Post",
                                datatype:"Json",
                                data: data,
                                success: function(res){              
                                    divProyecto(res);
                                    $("#menuCapa").hide('fast');
                                    limpiar();
                                    hide();
                                },
                                error:function(error){
                                    console.error(error)
                                }
                            }) 
    
                        }
                        
                    }
                }
                
                
            }
        })
      
    }
});
function agregarCarpeta(){
    $.ajax({
        url:"/carpetas",
        method: "GET",
        dataType:"json",
        success: function(res){
            console.log(res);
            for(var  i=0; i<res.length;i++){
                if(res[i].usuarioCreador==idUsuario){
                if (res[i].carpetaPadre == null) {
                    divCarpeta(res[i]);
                }else{
                    console.log("tiene padre")
                }}
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
                if(res[i].usuarioCreador==idUsuario){
                if (res[i].carpetaPadre == null) {                   
                    divArchivos(res[i]);
                }else{
                    console.log("tiene padre");
                }
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
        url: "/usuarios",
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
                $("#plan").append(`
                <p>
                    Actualmente cuentas con un Plan ${res[i].tipoPlan}
                </p>
                `);
                if(!(res[i].tipoPlan=="gratis")){
                    $("#tarjetaPlan").css("display","none"); 
                }
            }
            }
        },
        error: function(error){
            console.log(error);
        }
       
    })
}
$("#comprar").click(function(){
    $("#numeroCuenta").css("display","block"); 
    $("#CV").css("display","block");
    $("#btn-aceptar").css("display","block");
    $("#comprar").css("display","none"); 
    
})

$("#btn-aceptar").click(function(){
 var numeroCuenta= $("#numeroCuenta").val();
 var cv= $("#CV").val();
 var plan= "premiun";
var data= "&numeroCuenta="+ numeroCuenta + "&codigoCV=" + cv + "&tipoPlan="+plan;
     
$.ajax({
    url:"/usuarios/"+ idUsuario,
    method:"put",
    data: data,
    datatype:"json",
    success:function(res){
        console.log("eres Premiun");
    
    }
})

})

$("#btn-guardarCar").click(function(){
    var data= "&nombre="+$("#txt-Carpeta").val();        
    if($("#txt-Carpeta").val()==""){
        console.log("vacio");
    }else if(idCarpeta == 0){
        $.ajax({
            url:"/carpetas",
            method: "Post",
            data: data + "&usuarioCreador="+ idUsuario, 
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
            data: data + "&carpetaPadre="+ idCarpeta + "&usuarioCreador="+ idUsuario, 
            dataType:"json",               
            success: function(res){
                console.log(res);
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
            data: data +"&extencion="+extencion+"&imagen="+imagen+ "&usuarioCreador="+ idUsuario, 
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
            data: data +"&extencion="+extencion+"&imagen="+imagen +"&carpetaPadre="+idCarpeta +"&usuarioCreador="+ idUsuario, 
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
                if(res[i].usuarioCreador==idUsuario){
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
                if(res[i].usuarioCreador==idUsuario){
                    if (res[i].carpetaPadre == idCarpeta) {                
                    divArchivos(res[i]);
                    }
            }
            }
        },
        error:function(res){
            console.log(res)
        } 
    })
    $.ajax({
        url:"/proyectos",
        method: "Get",
        dataType:"Json",
        success: function(res){           
            for (var i = 0; i < res.length; i++) {
                if(res[i].usuarioCreador==idUsuario){
                    if (res[i].carpetaPadre == idCarpeta) {                
                    divProyecto(res[i]);
                    }
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
        agregarProyectos();     
        agregarArchivos();
        agregarCarpeta();
    }
    
}
function divCarpeta(res){
    // idCompartir = res._id;
    document.getElementById('raiz').innerHTML+=
    ` 
    <div class="col-lg-2 col-md-4 col-sm-6 cuadro" id="${res._id}">
                    <div class="col-lg-1 Dinamico">
                        <div class="dropdown1" >
                            <button class="dropbtn1 form-control botonDinamico" ><i class="fas fa-ellipsis-v"></i></i></button>
                            <div class="dropdown-content1">
                                <div class="container">
                                    <a href="#" class="letra nounderline" onclick="abrirCarpeta('${res._id}')" ><p><span> <i class="fas fa-folder-plus"></i> Abrir</span></p></a> 
                                    <a href="#" class="letra nounderline" data-toggle="modal" data-target="#myModal" onclick="compartir('${res._id}')" ><p><i class="fas fa-user-friends"></i> Compartir</span></p></a>
                                    <a href="#" class="letra nounderline" data-toggle="modal" data-target="#myModal2" onclick="actualizarCarpeta('${res._id}')"><p><span> <i class="fas fa-edit" ></i> Actualizar</span></p></a>
                                    <a href="#" class="letra nounderline" onclick="buscarEliminar('${res._id}')"><p><i class="far fa-trash-alt"></i></span> Eliminar</span></p></a>

                                </div>
                            </div>
                        </div> 
                        </div>
                    <div class="col-lg-11 col-md-11 col-sm-11">                                      
                        <img src="img/C_W.png" id="archivo">
                    </div>                                   
                    <div class="col-lg-12 nombre" >
                        <span>${res.nombre}</span>
                    </div>
                </div>
            </div> `;
}
function divArchivos(res){
    // idCompartir = res._id;
    
    document.getElementById('raiz').innerHTML+=
    ` 
    <div class="col-lg-2 col-sm-4 col-xs-6 cuadro archivo" id="${res._id}">
    <div class="col-lg-3 Dinamico">
            <div class="dropdown1" >
                <button class="dropbtn1 form-control botonDinamico" ><i class="fas fa-ellipsis-v"></i></i></button>
                <div class="dropdown-content1">
                    <div class="container">
                        <a href="javascript:pasarVariables('editor.html', '${res._id}')" class="letra nounderline"  ><p><span> <i class="fas fa-folder-plus"></i> Abrir</span></p></a>
                        <a href="#" class="letra nounderline" data-toggle="modal" data-target="#myModal" onclick="compartir('${res._id}')"><p><i class="fas fa-user-friends"></i> Compartir</span></p></a>
                        <a href="#" class="letra nounderline" data-toggle="modal" data-target="#myModal2" onclick="actualizarArchivos(${res.__id})"><p><span> <i class="fas fa-edit"></i> Actualizar</span></p></a>
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
var idProyecto=0;
function divProyecto(res){
     var idProyecto =res._id;
    $("#raiz").append(`
            <div class="col-lg-2 col-md-4 col-sm-6 cuadro" id="${res._id}">
                                <div class="col-lg-3 Dinamico">
                                    <div class="dropdown1" >
                                        <button class="dropbtn1 form-control botonDinamico" ><i class="fas fa-ellipsis-v"></i></i></button>
                                        <div class="dropdown-content1">
                                            <div class="container">
                                                <a href="javascript:pasarVariables('editor.html', '${res._id}')" class="letra nounderline"  ><p><span> <i class="fas fa-folder-plus"></i> Abrir</span></p></a> 
                                                <a href="#" class="letra nounderline" data-toggle="modal" data-target="#myModal2" onclick="actualizarProyecto(${res.__id})"><p><span> <i class="fas fa-edit"></i> Actualizar</span></p></a>
                                                <a href="#" class="letra nounderline" onclick="eliminarProyecto('${res._id}')"><p><i class="far fa-trash-alt"></i></span> Eliminar</span></p></a>
            
                                            </div>
                                        </div>
                                    </div> 
                                    </div>
                                <div class="col-lg-10" style="top: 15px;">                                   
                                    <img src="img/PC.jpg" id="archivo2">
                                </div>                                   
                                <div class="col-lg-12 nombre" style="top:2px">
                                    <span>${res.nombre}</span>
                                </div>
                            </div>
                        </div>
            `);
}


function pasarVariables(pagina, nombres) {
    pagina +="?";
    // nomVec = nombres.split(",");
    // for (i=0; i<nomVec.length; i++)
      pagina += nombres+"&";
    pagina = pagina.substring(0,pagina.length-1);
    location.href=pagina;
  }

function eliminarProyecto(idProy){
    // console.log(idProy)
 var arcProyecto = [];
 $.ajax({
    url:"/archivos",
    method:"get",
    datatype:"json",
    success: function(res){
        for (var i = 0; i < res.length; i++) {
            console.log(res[i])
           if(res[i].codigoProyecto==idProy){
               arcProyecto.push(res[i]._id);
            //    console.log("hola")
           }
            
        }
        console.log(arcProyecto)
        eliminarPA(arcProyecto, idProy); 
    },
    error:function(res){
        console.log(error);
    }
 });
}
function eliminarPA(archivos, idProy){
    for (var i = 0; i < archivos.length; i++) {
        $.ajax({
        url:"/archivos/"+ archivos[i],
        method:"delete",
        datatype:"json",
        success: function(res){            
        },
        error: function(error){
            console.error(error);
        }
    })        
    }
    proyectoRemove(idProy);
   
}
function proyectoRemove(idProy){
     $.ajax({
        url:"/proyectos/"+ idProy,
        method:"delete",
        datatype:"json",
        success: function(res){
            $("#"+idProy).remove();
            console.log("proyecto Eliminado coon Archivos");
            
        },
        error: function(error){
            console.error(error);
        }
    })
}
  
$("#btn-compartir").click(function(){    
    var idUserCompartir = $("#cmp-usuarios").val();
    // console.log(idCompartir);
    $.ajax({
        url:"/archivos/"+ idCompartir ,
        method:"get",
        datatype:"json",
        success:function(res){
            if(!(res.length==0)){
                compartirArchivos(idUserCompartir,idCompartir);
            }else{
                compartirCarpeta(idUserCompartir,idCompartir)
            }
        },error: function(error){
            console.log("error")+ error;
        }
    })
});

function compartirCarpeta(idUserCompartir,idCompartir){
    $.ajax({
        url:"/usuarios/"+ idUserCompartir +"/" + idCompartir + "/carpetas",
        method: "put",
        datatype: "json",
        success: function(res){
            // console.log(res);
            console.log("compartido carpeta");
            Push.create("Afirmacion", {
                body: "Carpeta Compartida con exito",
                // icon: '../img/logoV10_fondo_transparente.png',
                timeout: 4000,
                onClick: function () {
                    window.focus();
                    this.close();
                }
            });
        },
        error: function(res){
            // console.log(res);
        }

    })
}
function compartirArchivos(idUserCompartir,idCompartir){
    $.ajax({
        url:"/usuarios/"+ idUserCompartir +"/" + idCompartir +"/archivos",
        method: "put",
        datatype: "json",
        success: function(res){
            // console.log(res);
            console.log("compartido archivo");
            Push.create("Afirmacion", {
                body: "Archivo compartido",
                // icon: '../img/logoV10_fondo_transparente.png',
                timeout: 4000,
                onClick: function () {
                    window.focus();
                    this.close();
                }
            });
        },
        error: function(res){
            // console.log(res);
        }

    })
}
function compartir(id){
    idCompartir= id;
}

$("#compartidos").click(function(){
    document.getElementById("raiz").innerHTML="";
    document.getElementById("titulo").innerHTML="";
    document.getElementById("ruta").innerHTML=""; 
    document.getElementById("titulo").innerHTML=`Documentos Compartidos`;
    mostrarCarpetascmp();
    mostrarArchivoscmp();

    
});
 function mostrarCarpetascmp(){
    $.ajax({
        url:"/usuarios/"+ idUsuario +"/cmpCarpetas",
        method: "get",
        datatype: "json",
        success: function(res){
            
            for (var i = 0; i < res[0].compartidos.length; i++) {
                divCarpeta(res[0].compartidos[i]);
                
            }
            console.log(res[0].compartidos);
        },
        error: function(res){
            console.log(res);
        }
    })
 }

 function mostrarArchivoscmp(){
    $.ajax({
        url:"/usuarios/"+ idUsuario +"/cmpArchivos",
        method: "get",
        datatype: "json",
        success: function(res){
            for (var i = 0; i < res[0].cmpArchivos.length; i++) {
                divArchivos(res[0].cmpArchivos[i]);
                
            }
            console.log(res[0].cmpArchivos);
        },
        error: function(res){
            console.log(res);
        }
    })
 }


$("#cerrar").click(function(){
    $.ajax({
       url:"/destruir-sesion",
       method:"get",
       datatype:"json",
       success:function(){
           console.log("sesion cerrada");
           window.location.href = "/index.html";
       }
    })
})

var idActualizar=0;
function actualizarCarpeta(id){
    idActualizar= id;
}
$("#btn-actualizar").click(function(){    
    console.log(idActualizar);
    var nombre = $("#txt-actualizar").val();
    console.log(idUsuario);
    console.log(nombre)
    var contenido= "&nombre="+ nombre + "&carpetaPadre="+ idCarpeta+ "&usuarioCreador="+ idUsuario ;
    $.ajax({
        method:"PUT",
        url:"/carpetas/"+ idActualizar,        
        data:contenido,
        datatype:"json",        
        success:function(res){
            console.log("Actualizado");
            
            $.ajax({
                url:"/carpetas/"+ idActualizar,
                method:"get",
                datatype:"json",        
                success:function(res){
                    $("#"+ idActualizar).remove();
                    console.log(res[0]);
                    divCarpeta(res[0]);
                    console.log(res[0]._id)
                    
                },
                error:function(error){
                    console.log(error);
                }
            })
            
        },
        error:function(error){
            console.log(error);
        }
    })

})


































