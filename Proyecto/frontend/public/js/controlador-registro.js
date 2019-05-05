$("#btn-registrar").click(function(){
    var correo= $("#correo").val();
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
    
     
    $.ajax({
        url:"/usuarios",
        method:"get",
        datatype:"json",
        success:function(res){
            for (let i = 0; i < res.length; i++) {
                if(res[i].correo==correo){
                  
                    Push.create("Alerta", {
                        body: "los sentimos este correo ya existe",
                        // icon: '../img/logoV10_fondo_transparente.png',
                        timeout: 4000,
                        onClick: function () {
                            window.focus();
                            this.close();
                        }
                    });
                    document.getElementById(correo).classList.add('input-error');
                    return;                  
                }                
            }
            var plan= "gratis";
            var parametros = $("#formulario").serialize();      
            console.log(parametros);
            $.ajax({
                url:"/usuarios/singup",
                    method:"post",
                    data: parametros+ "&tipoPlan="+ plan,
                    dataType: "json",
                    success: function(res){
                        limpiarFormulario();
                        window.location = 'login.html';
                        console.log("registro guardado")
                    },
                    error: function(error){
                        console.log(error);
                    } 
            });

        }
    })




     
      

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
function validarCorreo(etiquetaCorreo){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(etiquetaCorreo.value))
        etiquetaCorreo.classList.remove('input-error');
    else
        etiquetaCorreo.classList.add('input-error');

}