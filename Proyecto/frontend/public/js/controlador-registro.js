$("#btn-registrar").click(function(){
    
    var campos= [
        {campo:"nombre", value: false},
        {campo :"apellido", value: false},
        {campo: "correo", value:false},
        {campo: "contrasena", value:false}
    ]

    for(var i=0;i<campos.length;i++){
        campos[i].value = validarCampos(campos[i].campo); 
     };


     for (var i = 0; i < campos.length; i++) {
         if (!campos[i].value) 
         return;          
         
     }
     
  
        var parametros = $("#formulario").serialize();      
        // console.log("llenos");
        $.ajax({
            url:"http://localhost:3334/usuarios/singup",
                method:"post",
                data: parametros,
                dataType: "json",
                success: function(res){
                    limpiarFormulario();
                    window.location = 'ordenador.html';
                    console.log("registro guardado")
                },
                error: function(error){
                    console.log(error);
                } 
        });

});

function validarCampos(campo){
    if (document.getElementById(campo).value ==''){
       document.getElementById(campo).classList.add('input-error');
       document.getElementById("advertencia").style.display = 'block';
       return false;
   }
   else{
       document.getElementById(campo).classList.remove('input-error');
       document.getElementById("advertencia").style.display = 'none';
       return true;
   }

}

function limpiarFormulario(){
    document.getElementById("formulario").reset();

}