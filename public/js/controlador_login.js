
    


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
        // console.log(res)
        crearSesion(res.usuario.correo)
        // console.log("autenticado");
        window.location.href = "/ordenador.html";
       
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





// $(function() {
//     var app_id='2179046095483265';
//     var scopes='email, user_friends';
   
//     var btn_login_face='<button id="login" class="form-control">Login con Facebook</button>';
//     var div_session = "<div id='facebook-session'>"+
//                       "<strong></strong>"+
//                       "<img>"+
//                       "<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
//                       "<a href='#' id='entrar' class='btn btn-success'>Entrar</a>"+
//                       "</div>";
  
                                                      
//         window.fbAsyncInit = function() {    
//             FB.init({
//               appId      : app_id,
//               status     : true,
//               cookie     : true, 
//               xfbml      : true, 
//               version    : 'v3.3'
//             });   
//             FB.getLoginStatus(function(response) {
//               statusChangeCallback(response, function() {});
//             });
//         };          
//             var statusChangeCallback = function(response, callback) {
//                 console.log(response);
                
//             if (response.status === 'connected') {
//                     getFacebookData();
//             } else {
//                 callback(false);
//             }
//             }
        
//             var checkLoginState = function(callback) {
//             FB.getLoginStatus(function(response) {
//                     callback(response);
//             });
//             }
    
//         var getFacebookData =  function() {
//             $("#email").css("display","none"); 
//             $("#password").css("display","none");
//             $("#btn-login").css("display","none");
//             FB.api('/me', function(response) {
//                 $('#login').after(div_session);
//                 $('#login').remove();
//                 $('#facebook-session strong').text("Bienvenido: "+response.name);
//                 $('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
//             });
//         }
    
//         var facebookLogin = function() {
//             checkLoginState(function(data) {
//                 if (data.status !== 'connected') {
//                     FB.login(function(response) {
//                             getFacebookData();
    
//                     }, {scope: scopes});
//                 }
//             })
//         }
    
//         var facebookLogout = function() {
//             checkLoginState(function(data) {
//                 if (data.status === 'connected') {
//                   FB.logout(function(response) {
                    
//                       $('#facebook-session').before(btn_login_face);
//                       $('#facebook-session').remove();
//                   })
//               }
//             })
    
//         }    
//         $(document).on('click', '#login', function(e) {
//             e.preventDefault();
//             console.log("aqui estoy") ;
//             facebookLogin();
//         })
    
//         $(document).on('click', '#logout', function(e) {
//             e.preventDefault();
    
//             if (confirm("¿Está seguro?")){
                
//                 $("#email").css("display","block"); 
//                 $("#password").css("display","block");
//                 $("#btn-login").css("display","block"); 
//                 facebookLogout();
//             }
//             else {
//                 return false;}
//         })
//         (function(d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) return;
//             js = d.createElement(s); js.id = id;
//             js.src = "//connect.facebook.net/en_US/sdk.js";
//             fjs.parentNode.insertBefore(js, fjs);
//           }(document, 'script', 'facebook-jssdk'));

//           ("#entrar").click(function(){

//           })
        

     
//     });

    