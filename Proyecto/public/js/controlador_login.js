
function registros(){
    var campos =[
        {campo:'email',valido:false},
        {campo:'password',valido:false}
    ];


    
    for(var i=0;i<campos.length;i++){
       campos[i].valido = validarCampos(campos[i].campo); 
    };
    
}

function validarCampos(campo){
     if (document.getElementById(campo).value ==''){
        document.getElementById(campo).classList.add('input-error');
        return false;
    }
    else{
        document.getElementById(campo).classList.remove('input-error');
        return true;
    }

}

// function mensaje(){
//     console.log("Hola mundo");
// }
