
// function registros(){
//     var campos =[
//         {campo:'email',valido:false},
//         {campo:'password',valido:false}
//     ];


    
//     for(var i=0;i<campos.length;i++){
//        campos[i].valido = validarCampos(campos[i].campo); 
//     };
    
// }

// function validarCampos(campo){
//      if (document.getElementById(campo).value ==''){
//         document.getElementById(campo).classList.add('input-error');
//         return false;
//     }
//     else{
//         document.getElementById(campo).classList.remove('input-error');
//         return true;
//     }

// }



$("#btn-login").click(function(){
    //  console.log("hola");
var data = $("#formulario").serialize();
console.log(data);
$.ajax({
    url:"http://localhost:3334/usuarios/signin",
    method:"post",
    datatype:"Json",
    data: data,
    success: function(res){
        console.log("autenticado");
    },
    error: function(error){
        console.log(error)
    }

})

});
