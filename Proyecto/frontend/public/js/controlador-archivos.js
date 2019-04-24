$(document).ready(function(){

    $.ajax({
        url:"http://localhost:3334/carpetas",
        method: "get",
        datatype:"json",
        success: function(res){
            for(var  i=0; i<res.length;i++){
                document.getElementById('archivos').innerHTML+=
                `<div class="row">  
                    <div class="col-lg-12">
                        <img src="img/C_W.png" id="archivo">
                    </div>
                    <div class="col-lg-12" id="texto">
                            <h6>${res[i].nombre}</h6>
                    </div>
                </div>`;
                }
                },
        error: function(res){
            console.log(res);
            
        }
    })




});






// codigo viejo

    // var carpetas=[
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'},
    //     {imagen:'img/C_W.png',nombre:'nombre'}          
    // ];

    // for(var  i=0; i<carpetas.length;i++){
    // document.getElementById('archivos').innerHTML+=
    // `<div class="row cuadro">  
    //     <div class="col-lg-12">
    //         <img src="${carpetas[i].imagen}" id="archivo">
    //     </div>
    //     <div class="col-lg-12" id="texto">
    //             <h6>${carpetas[i].nombre}</h6>
    //     </div>
    // </div>`;
    // }