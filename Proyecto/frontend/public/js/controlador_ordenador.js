var id = "5cb58116e62abb2448bfc24c";

// (function(){
//     var carpetas=[
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'},
//         {imagen:'img/C_W.png',nombre:'nombre'}          
//     ];

//     for(var  i=0; i<carpetas.length;i++){
//     document.getElementById('tarjetas').innerHTML+=
//     `<div class="row cuadro">  
//         <div class="col-lg-12">
//             <img src="${carpetas[i].imagen}" id="archivo">
//         </div>
//         <div class="col-lg-12" id="texto">
//                 <h6>${carpetas[i].nombre}</h6>
//         </div>
//     </div>`;
// }
// })();

$(document).ready(function(){
     // valor debe ser dinamico

    $.ajax({
        method:"GET",
        url: "http://localhost:3334/usuarios/"+ id ,
        datatype: "JSON",
        success: function(res){
            for (var i = 0; i < res.length; i++) {
               if(res[i]._id==id){
                $("#actualizar").append(
                        `<input type="text" class="form-control separacion1" name=nombre value="${res[i].nombre}">
                        <input type="text" class="form-control separacion1" name=apellido value="${res[i].apellido}"> 
                        <input type="text" class="form-control separacion1" name=correo value="${res[i].correo}">
                        <input type="text" class="form-control separacion1" name=contrasena value="${res[i].contrasena}">                
                        `
                    )
               }
            }
            // console.log(res[0].nombre);
            // 

        },
        error: function(error){
            console.log(error);
        }
       
    })


});

$(document).bind("contextmenu", function(e){  
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
        url: "http://localhost:3334/usuarios/"+ id ,
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
    
// function cargarFoto(){
//     $("#foto").css("display","bloch");
// };
        
$("#actFoto").click(function(){
    $("#foto").css("display","block");
    $("#guardarFoto").css("display","block");
    $("#actFoto").css("display","none");
    

});

$("#gbFoto").click(function(){
    var foto= $("#foto").serialize();

   
    

});

$("#btn-archivos").click( function(){
    $.ajax({
        url:"archivos.html",
        datatype:"html",
        success: function(data){
            $("#tarjetas").html(data);
        }
    })
  
});

$("#btn-proyectos").click( function(){
    $.ajax({
        url:"proyecto.html",
        datatype:"html",
        success: function(data){
            $("#tarjetas").html(data);
        }
    })
  
});

$("#btn-compartido").click( function(){
    $.ajax({
        url:"compartido.html",
        datatype:"html",
        success: function(data){
            $("#tarjetas").html(data);
        }
    })
  
});

