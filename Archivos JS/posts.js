const { json } = require("body-parser");

var enviadoComentario = new Boolean(false);
var mensaje;
var distintivo = 0;
var tweetReal;
var fechaCompleta;
var fecha = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth() + 1;
var year = fecha.getFullYear();
var horas = fecha.getHours();
var minutos = fecha.getMinutes();
var segundos = fecha.getSeconds();
fechaCompleta = year + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos;

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
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    fechaCompleta = year + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos;
    var headder = "nombre" + "  " +  "- " + "arr" + "  " + "-" + "  " + fechaCompleta;
    var numRetweets = 0;
    var numComments = 0;
    var tweetTemporal = {"FechaPublicacion":fechaCompleta, "Retweets":"0", "Comentarios":[], "Texto":mensaje,"Username": infoPersona[0]["Username"]};
    var tweetTemporal = JSON.stringify(tweetTemporal);
    mandaTweet(tweetTemporal);

    //haceTweet(mensaje, headder, numRetweets, numComments, tweetTemporal["Comentarios"], "distintivo" + distintivo);
      
  //  todosLosTweets.push(tweetTemporal);

    //distintivo++;

    location.reload();

    
};




function enviarComentario(){
    var usrName = infoPersona[0]["NombreUsuario"];
    var arr = infoPersona[0]["Username"];
    mensaje = document.getElementById("textoComentario").value;
    enviadoComentario = true;
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var year = fecha.getFullYear();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    fechaCompleta = year + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos;
    var comentarioNuevo = {"Username":arr, "fechaComentado":fechaCompleta, "nombreUsuario":usrName, "comentario":mensaje};
    console.log(comentarioNuevo)
    for(var i = 0; i < todosLosTweets.length; i++){
            
        if(todosLosTweets[i]["@rid"] == actual){
                
            todosLosTweets[i]["Comentarios"].push(comentarioNuevo);
                
            document.getElementById(actual + 3).textContent++;
            var guardaBase = {"rid":todosLosTweets[i]["@rid"], "Comentarios":todosLosTweets[i]["Comentarios"]}
            mandaComentario(JSON.stringify(guardaBase));
        }
    }
    
    location.reload();
};


function mandaComentario(comentario){
    var comentarioActual = comentario;

    console.log(comentario);

    fetch('http://localhost:3000/actualizarComentario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: comentarioActual
    })
}

function mandaTweet(tweet){
    var tweetActual = tweet;

    console.log(tweet);

    fetch('http://localhost:3000/tweet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: tweetActual
    })
}