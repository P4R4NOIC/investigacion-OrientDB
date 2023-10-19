var enviadoComentario = new Boolean(false);
var mensaje;
var distintivo = 0;

function activarModalCrearPost(){
    var myModalEl = document.querySelector('#modalCrearPost')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
    modal.show()
}




function enviarPost(){
    let mensaje = document.getElementById("message-text").value;
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var year = fecha.getFullYear();
    var fechaCompleta = year + "-" + mes + "-" + dia;
    var headder = "nombre" + "  " +  "- " + "arr" + "  " + "-" + "  " + fechaCompleta;
    var numRetweets = 0;
    var numComments = 0;
    var comentariosLista = [];
    var tweetTemporal = {"@rid":"distintivo" + distintivo, "FechaPublicacion":fechaCompleta, "Retweets":"0", "Comentarios":[], "Texto":mensaje, "nombreUsuario":"nombre", "Username":"arr"};
   
    haceTweet(mensaje, headder, numRetweets, numComments, tweetTemporal["Comentarios"], "distintivo" + distintivo);
    

     var tweetReal = {"FechaPublicacion":fechaCompleta, "Retweets":"0", "Comentarios":[], "Texto":mensaje, "nombreUsuario":"nombre", "Username":"arr"}; 
    
    todosLosTweets.push(tweetTemporal);
    

    distintivo++;
    
};

function enviarComentario(){
    var usrName = "fer";
    var arr = "@fer";
    var fecha = "12-12-12 00:00:00",
    mensaje = document.getElementById("textoComentario").value;
    enviadoComentario = true;

    var comentarioNuevo = {"Username":arr, "fechaComentado":fecha, "nombreUsuario":usrName, "comentario":mensaje};
    
    if(document.getElementById(actual + "1").getAttribute("click") == "si"){
        var comentario = haceComentario(usrName, arr, fecha, mensaje);
        document.getElementById(actual +"2").appendChild(comentario);

        for(var i = 0; i < todosLosTweets.length; i++){
            if(todosLosTweets[i]["@rid"] == actual){
                todosLosTweets[i]["Comentarios"].push(comentarioNuevo);
                document.getElementById(actual + 3).textContent++;
                
            }
        }

    }

    else if(document.getElementById(actual + "1").getAttribute("click") == "no"){
        
        for(var i = 0; i < todosLosTweets.length; i++){
            
            if(todosLosTweets[i]["@rid"] == actual){
                
                todosLosTweets[i]["Comentarios"].push(comentarioNuevo);
                
                document.getElementById(actual + 3).textContent++;
            }
        }
    }
    return mensaje;
};