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
