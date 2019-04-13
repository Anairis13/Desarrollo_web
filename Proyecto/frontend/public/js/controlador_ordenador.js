(function(){
    var carpetas=[
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'},
        {imagen:'img/C_W.png',nombre:'nombre'}          
    ];

    for(var  i=0; i<carpetas.length;i++){
    document.getElementById('tarjetas').innerHTML+=
    `<div class="row cuadro">  
        <div class="col-lg-12">
            <img src="${carpetas[i].imagen}" id="archivo">
        </div>
        <div class="col-lg-12" id="texto">
                <h6>${carpetas[i].nombre}</h6>
        </div>
    </div>`;
}
})();

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

    





