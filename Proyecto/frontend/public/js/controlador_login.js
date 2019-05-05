
    


$("#btn-login").click(function(){

var data = $("#formulario").serialize();    
var campos =[
    {campo:'email',valido:false},
    {campo:'password',valido:false}
];    
for(var i=0;i<campos.length;i++){
    campos[i].valido = validarCampos(campos[i].campo); 
};   

for (var i = 0; i < campos.length; i++) {
        if (!campos[i].valido) 
        return;          
        
    }


    $.ajax({
        url:"/usuarios/login",
        method:"post",
        datatype:"Json",
        data: data,
        success: function(res){
            console.log(res)
            if(!(res.status==0)){
                crearSesion(res.usuario.correo)
            // console.log("autenticado");
            window.location.href = "/ordenador.html";
            }else{
                Push.create("Alerta", {
                    body: "Usuario y contraseña incorrecta",
                    // icon: '../img/logoV10_fondo_transparente.png',
                    timeout: 4000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
            }
            
        
        },
        error: function(error){
           
            console.log(error)
        }
    
    })

});

function crearSesion(correo){
// console.log(codigoUsuario);

     $.ajax({
          url:"/login/" + correo,
          method:"get",
          datatype:"json",
          success: function(res){
              console.log(res);
              console.log("sesion creada");
          },
          error: function(error){
              console.error(error);
          }
        })
}

function validarCampos(campo){
    if (document.getElementById(campo).value ==''){
       document.getElementById(campo).classList.add('input-error');
       document.getElementById("advertencia").style.display = 'block';
       return false;
   }
   else{
       document.getElementById(campo).classList.remove('input-error');
       return true;
   }

}

function validarCorreo(etiquetaCorreo){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(etiquetaCorreo.value))
        etiquetaCorreo.classList.remove('input-error');
    else
        etiquetaCorreo.classList.add('input-error');

}
