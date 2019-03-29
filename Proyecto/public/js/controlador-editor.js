    
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
