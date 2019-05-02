    
function update(){
    var res =document.getElementById('iframe').contentWindow.document;

    res.open();
    res.write(eh.getValue());
    res.write('<style>'+ec.getValue()+'</style>');
    res.write('<script>'+ ejs.getValue()+'</script>');
    res.close(); 
}
function setEditor(){
    window.eh = ace.edit('editorHtml');
    eh.setTheme("ace/theme/cobalt");
    eh.getSession().setMode("ace/mode/html");
    eh.getSession().on('change',function(){
        update();
    });

    window.ec = ace.edit('editorCss');
    ec.setTheme("ace/theme/cobalt");
    ec.getSession().setMode("ace/mode/css");
    ec.getSession().on('change',function(){
        update();
    });

    window.ejs = ace.edit('editorJs');
    ejs.setTheme("ace/theme/cobalt");
    ejs.getSession().setMode("ace/mode/css");
    ejs.getSession().on('change',function(){
        update();
    });
}
setEditor();
update();


$(document).ready(function(){
    verificarArchivos();
    obtenerSesion();
   
    

});
var codProyecto = window.location.search.substring(1); //codigo Proyecto
// var archivos=[];
var extenciones=[];
var idUsuario=0;
function verificarArchivos(){
    $.ajax({
        url:"/archivos",
        method:"get",
        datatype:"json",
        success:function(res){
            for (let i = 0; i < res.length; i++) {
                if(!(res[i].codigoProyeto==0)){
                    if(res[i].codigoProyecto==codProyecto){
                        switch(res[i].extencion) {
                            case 1: eh.setValue(res[i].contenido);
                            break;
                            case 2: ec.setValue(res[i].contenido);
                            break;
                            case 3: ejs.setValue(res[i].contenido);
                            break;                            
                            default: puts("Error");
                            }
                    }
                }                 
                
                
            }
        }

    })
}

$("#btn-guardar").click(function(){
   var archivos=[]; 
   var arHtml= eh.getValue();
   var arhCss = ec.getValue();
   var arhJs = ejs.getValue();

   if(!(arHtml==0)){
    archivos.push(arHtml);
    extenciones.push(1);
   } 
   if(!(arhCss==0)){
    archivos.push(arhCss);
    extenciones.push(2);
   }
   if(!(arhJs==0)){
    archivos.push(arhJs);
    extenciones.push(3);
   }
   console.log("archivos vacios");
      
   
   
   console.log(archivos);
 
   var data="";
   for (var i = 0; i < archivos.length; i++) {
       data = "&codigoProyecto="+codProyecto + "&extencion="+ extenciones[i] + "&contenido=" + archivos[i]+"&usarioCreador="+ idUsuario;
    $.ajax({
               url:"/archivos",
               method:"post",
               data: data,
               datatype:"Json",
               success: function(res){
                Push.create("Afirmacion", {
                    body: "Guardado con exito!",
                    // icon: '../img/logoV10_fondo_transparente.png',
                    timeout: 4000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
                //    console.log("Archivo Almacenado");
               },
               error: function(error){
                   console.log(error);
               }
           })
       
   }

//    console.log(css); 
//    console.log(js); 
})
// $("#btn-guardar").css("display","none");
// $("#btn-guardarArchivos").css("display","none");

function obtenerSesion(){
   function obtenerSesion() {
    $.ajax({
        url:"/obtener-sesion",
        dataType:"json",
        method:"get",
        success: function(res){
            // console.log(res.correo);
                $.ajax({
                    url:"/usuarios",
                    method: "get",
                    datatype:"json",
                    success: function(respuesta){
                        for (var i = 0; i < respuesta.length; i++) {
                            if (res.correo==respuesta[i].correo) {
                               idUsuario= respuesta[i]._id;

                            }
                            
                        }
                    }
                })
        },
        error: function(error){
            console.error(error);
        }

    })
}
}