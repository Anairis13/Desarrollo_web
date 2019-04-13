$("#btn-registrar").click(function(){
    
    var campos= [
        {campo:"nombre", value: false},
        {campo :"apellido", value: false},
        {campo: "correo", value:false},
        {campo: "contrasena", value:false}
    ]

    for(var i=0;i<campos.length;i++){
        campos[i].valido = validarCampos(campos[i].campo); 
     };

     
        var parametros = $("#formulario").serialize();      
        console.log("llenos");
        $.ajax({
            url:"http://localhost:3334/usuarios/",
                method:"post",
                data: parametros,
                dataType: "json",
                success: function(res){
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
       return false;
   }
   else{
       document.getElementById(campo).classList.remove('input-error');
       return true;
   }

}