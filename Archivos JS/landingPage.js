var actual;
var tweetsPropiosCargados = new Boolean(false);
var todosLosTweets = [];


var infoPersona = {};

var tweetsDeUno = [];


function cargarPagina(){
    
    //autenticar()
    
    tweetsPropiosCargados = false;
    
    pedirPersonas(); 
    pedirSeguidores();
    pedirTodosTweets();
    cargaDatosUsuario();
    
}

function cierreSesion(){
    localStorage.clear();
    window.location.href="../Archivos HTML/login.html";
}


function prueba(){
   var label =  document.createElement("label");
   label.setAttribute("gustado", "no");
   label.textContent = "sirve";
   label.id = "algo";

   document.getElementById("p").appendChild(label);



   var tweet = "este es el cuerpo del tweet";
   var nombreUsuario = "Fernando Gross";
   var arroba = "@fgross";
   var fechaPubli = "18/10/23";
   var numLikes = 2;
   var numRetweets = 102;
   var numComments = 300;

   var headder = nombreUsuario + "  " +  "- " + arroba + "  " + "-" + "  " +fechaPubli;

   cargaTodosTweets();

}

function cargaTodosTweets(){
    for(var i = 0; i < todosLosTweets.length; i++){
        
        var tweet = todosLosTweets[i]["Texto"];
        var numRetweets = parseInt(todosLosTweets[i]["Retweets"]);

        if(todosLosTweets[i]["Comentarios"] == null){
            todosLosTweets[i]["Comentarios"] = [];
        }
        var numComments = todosLosTweets[i]["Comentarios"].length;
        var headder = todosLosTweets[i]["nombreUsuario"] + "  " +  "- " + todosLosTweets[i]["Username"] + "  " + "-" + "  " + todosLosTweets[i]["FechaPublicacion"]
        
        haceTweet(tweet, headder, numRetweets, numComments, todosLosTweets[i]["Comentarios"], todosLosTweets[i]["@rid"], todosLosTweets[i]["Username"]);
        
    }
}

function cargaDatosUsuario(){

        infoPersona = JSON.parse(localStorage.getItem("usuario"));
    
      
        document.getElementById("seguidoresPersona").textContent = infoPersona[0]["nSeguidores"];
        document.getElementById("siguiendoPersona").textContent = infoPersona[0]["nSeguidos"];
        document.getElementById("estadoPersona").textContent = infoPersona[0]["Estado"];
        document.getElementById("fecNacPersona").textContent = infoPersona[0]["FechaNacimiento"];
        document.getElementById("usrNamePersona").textContent = infoPersona[0]["NombreUsuario"];
        document.getElementById("arrPersona").textContent = infoPersona[0]["Username"];
}



function haceTweet(tweet, headder, numRetweets, numComments, comentariosLista, rid, arroba){
    
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    var div6 = document.createElement("div");
    var div7 = document.createElement("div");


    var a1 = document.createElement("a");
    var a2 = document.createElement("a");
    var a3 = document.createElement("a");
    var a4 = document.createElement("a");
    var a5 = document.createElement("a");
    var a6 = document.createElement("a");

    var img = document.createElement("img");

    
    var label1 = document.createElement("label");
    var label2 = document.createElement("label");
    var label3 = document.createElement("label");
    var label4 = document.createElement("label");
    var label5 = document.createElement("label");
    var label6 = document.createElement("label");
    var label7 = document.createElement("label");

    div1.classList = "row postIndividual";
    div1.id = "tweet"
    div2.classList = "col-1";

    a1.href = "#";

    img.src = "../Miscelaneo/person.png";
    img.alt = "Foto Perfil";
    img.classList = "img-thumbnail fotoPerfilPeq";

    a1.appendChild(img);
    div2.appendChild(a1);
    div1.appendChild(div2);

    div3.classList = "col-10";

    div4.classList = "row";

    a2.href = "#";
    a2.classList = "mandaPerfil";
    a2.textContent = headder; 
   
    a2.onclick = function(){

    
        cargarDatosPersonaLlamada(arroba)
       
     
    }
    
    div4.appendChild(a2);
    div3.appendChild(div4);

    div5.classList = "row";
    div5.id = "tweetText";
    div5.textContent = tweet 

    div3.appendChild(div5);

    div6.classList = "row";

    div7.classList = "filaAbajo";

   


  

    label2.for = "";
    label2.classList = "textos sigue";
   



    a6.classList = "respuestas"
    a6.href = "#";
    a6.onclick = function(){
        numRetweets++;
        var usuario = JSON.parse(localStorage.getItem("usuario"));
        var mandaActualizador = {"urid":usuario[0]["@rid"], "trid":rid, "contador":numRetweets};
        actualizadorRetweets(JSON.stringify(mandaActualizador));
        label4.textContent = numRetweets;
       
    }


    label3.for = "";
    label3.classList = "textos sigue init abajo";
    label3.textContent = "ReTECs:" + " " ;

    label4.for = "";
    label4.classList = "textos sigue";
    label4.textContent = "  "+ numRetweets; 

    a6.appendChild(label3);
    a6.appendChild(label4);

    div7.appendChild(a6);
 

    a4.href = "#"
    a4.classList = "respuestas";
    a4.setAttribute("click", "no");

    a4.onclick = function(){
        if(a4.getAttribute("click") == "no"){

         
          
         
            for(var i = 0; i < comentariosLista.length; i++){
                var comentario = haceComentario(comentariosLista[i]["nombreUsuario"], comentariosLista[i]["Username"], comentariosLista[i]["fechaComentado"], comentariosLista[i]["comentario"]);
                div1.appendChild(comentario);
            }
            a4.setAttribute("click", "si");

        }
        else if(a4.getAttribute("click") == "si"){
            for(var i = 0; i < comentariosLista.length; i++){
            document.getElementById("comentario").remove();
            }
            a4.setAttribute("click", "no");
        }
    }

    label5.for = "";
    label5.classList = "textos sigue init abajo";
    label5.textContent = "Respuestas: ";
    

    label6.for = "";
    label6.classList = "textos sigue";
    label6.textContent = numComments;  

    
    a5.href = "#";
    a5.classList = "respuestas";
    
    label7.for = "";
    label7.classList = "textos sigue init abajo"
    label7.textContent = "Comentar"

    label7.onclick = function (){

        var myModalEl = document.querySelector('#modalCrearComentario')
        var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
        envidadoComentario = false;
        modal.show()
        actual = rid;
        a4.id = rid + "1";
        
        div1.id = rid + "2";
        label6.id = rid + "3";
     
    };

    a5.appendChild(label7);

    a4.appendChild(label5);
    a4.appendChild(label6);

    div7.appendChild(a4);
    div7.appendChild(a5);

    div6.appendChild(div7);

    div3.appendChild(div6);

    div1.appendChild(div3);

    document.getElementById("tweets").appendChild(div1);





}

function actualizadorRetweets(mandaDatos){
   
    mandaDatosBaseRet(mandaDatos)

}

function mandaDatosBaseRet(mandaDatos){
  

    fetch('http://localhost:3000/retweetU', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: mandaDatos
    })
    .then(response => response.json()) 
    .then(data => {
       
        alert(data.message);
               
    })
    .catch(error => {
        // Maneja errores si la solicitud falla
        console.error('Error:', error);
    });

   //location.reload();
}

function cargarDatosPersonaLlamada(arroba){
    pedirTodosTweetsDeUno(arroba);
}

function cargaRetweetsPropiosLlamada(){
    pedirTodosReTweets(JSON.parse(localStorage.getItem("usuario"))[0]["Username"])
}

function cargarDatosPersona(arroba){
    document.getElementById("seguidoresPersona").textContent = infoPersona[0]["nSeguidores"];
    document.getElementById("siguiendoPersona").textContent = infoPersona[0]["nSeguidos"];
    document.getElementById("estadoPersona").textContent = infoPersona[0]["Estado"];
    document.getElementById("fecNacPersona").textContent = infoPersona[0]["FechaNacimiento"];
    document.getElementById("usrNamePersona").textContent = infoPersona[0]["NombreUsuario"];
    document.getElementById("arrPersona").textContent = infoPersona[0]["Username"];

    document.getElementById("botonPerfil").textContent = "Seguir";
    document.getElementById("botonPerfil").classList = "boton botonCrea botonSeguir"
    document.getElementById("botonPerfil").onclick = function(){
        seguirPersona(arroba);
    }
    
    if(tweetsPropiosCargados == true){
        for(var i = 0; i < tweetsDeUno.length; i++){
            document.getElementById("tweet").remove();
        }
    }
    else{
        for(var i = 0; i < todosLosTweets.length; i++){
            document.getElementById("tweet").remove();
        }
    }
    
    
    for(var i = 0; i < tweetsDeUno.length; i++){
        var tweet = tweetsDeUno[i]["Texto"];
        var numRetweets = parseInt(tweetsDeUno[i]["Retweets"]);
        if(tweetsDeUno[i]["Comentarios"] == null){
            tweetsDeUno[i]["Comentarios"] = [];
        }
        var numComments = tweetsDeUno[i]["Comentarios"].length;
        var headder = infoPersona[0]["nombreUsuario"] + "  " +  "- " + infoPersona[0]["Username"] + "  " + "-" + "  " + tweetsDeUno[i]["FechaPublicacion"]
        haceTweet(tweet, headder, numRetweets, numComments, tweetsDeUno[i]["Comentarios"], tweetsDeUno[i]["@rid"], tweetsDeUno[i]["Username"]);
        
    }
    tweetsPropiosCargados = true;
}


function haceComentario(nombreUsuario, arroba, fecha, comentario){
    var div = document.createElement("div");
    var label1 = document.createElement("label");
    var label2 = document.createElement("label");
    div.classList = "row comentario"; 
    div.id = "comentario";   
    label1.textContent = nombreUsuario + "  " +  "- " + arroba + "  " + "-" + "  " +fecha;  
    label2.textContent = comentario;  
    div.appendChild(label1);
    div.appendChild(label2);
    return div;
}


function seguirPersona(arroba){
    var seguido = arroba;
    var seguidor = JSON.parse(localStorage.getItem("usuario"))[0]["Username"];
    var seguirJSON = {"Seguido": seguido, "Seguidor":seguidor};
    var seguir = JSON.stringify(seguirJSON); 
    fetch('http://localhost:3000/seguir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:seguir // Asegúrate de que seguir sea un objeto JavaScript
    })
    .then(response => response.json()) // Convierte la respuesta a JSON si es aplicable
    .then(data => {
        // Aquí puedes acceder a la respuesta del servidor, que está en la variable 'data'
        alert(data.message);
        if(data.message==='Se ha seguido al usuario'){
            var usuario = JSON.parse(localStorage.getItem("usuario"));
            var seguidos = usuario[0]["nSeguidos"];
            seguidos++;
            usuario[0]["nSeguidos"] = seguidos;
            localStorage.setItem("usuario", JSON.stringify(usuario))
          
            cargaDatosUsuario();
        }else{
            
        }
       
        
    })
    .catch(error => {
        // Maneja errores si la solicitud falla
        console.error('Error:', error);
    });
    
}

function cargaTweetsPropiosLlamada(){
    pedirTodosTweetsDeUno(JSON.parse(localStorage.getItem("usuario"))[0]["Username"]);
}



function cargaTweetsPropios(){

  

    if(tweetsPropiosCargados == true){

        for(var i = 0; i < tweetsDeUno.length; i++){
            document.getElementById("tweet").remove();
        }
    }
    else{
        for(var i = 0; i < todosLosTweets.length; i++){
            document.getElementById("tweet").remove();
        }
    }
    

    for(var i = 0; i < tweetsDeUno.length; i++){
        var tweet = tweetsDeUno[i]["Texto"];
        var numRetweets = parseInt(tweetsDeUno[i]["Retweets"]);
        if(tweetsDeUno[i]["Comentarios"] == null){
            tweetsDeUno[i]["Comentarios"] = [];
        }

        
        var numComments = tweetsDeUno[i]["Comentarios"].length;
        var headder = infoPersona[0]["NombreUsuario"] + "  " +  "- " + infoPersona[0]["Username"] + "  " + "-" + "  " + tweetsDeUno[i]["FechaPublicacion"]
        haceTweet(tweet, headder, numRetweets, numComments, tweetsDeUno[i]["Comentarios"], tweetsDeUno[i]["@rid"], tweetsDeUno[i]["Username"]);
        
    }
    tweetsPropiosCargados = true;

    
}

function cargaRetweetsPropios(){
  
    if(tweetsPropiosCargados == true){

        for(var i = 0; i < tweetsDeUno.length; i++){
            document.getElementById("tweet").remove();
        }
    }
    else{
        for(var i = 0; i < todosLosTweets.length; i++){
            document.getElementById("tweet").remove();
        }
    }
    

    for(var i = 0; i < tweetsDeUno.length; i++){
        var tweet = tweetsDeUno[i]["tweets"]["Texto"];

        var numRetweets = parseInt(tweetsDeUno[i]["tweets"]["Retweets"]);

       

        if(tweetsDeUno[i]["tweets"]["Comentarios"] == null){
          
            var numComments = 0
        }
        else if(tweetsDeUno[i]["tweets"]["Comentarios"] != null){
            var numComments = tweetsDeUno[i]["tweets"]["Comentarios"].length;
        }
        
        
        var headder = tweetsDeUno[i]["NombreUsuario"] + "  " +  "- " + tweetsDeUno[i]["Username"] + "  " + "-" + "  " + tweetsDeUno[i]["tweets"]["FechaPublicacion"]
       
        haceTweet(tweet, headder, numRetweets, numComments, tweetsDeUno[i]["Comentarios"], tweetsDeUno[i]["@rid"], tweetsDeUno[i]["Username"]);
        
    }
    tweetsPropiosCargados = true;
}


function pedirTodosTweets(){
    let datosRecibidos;
  
    fetch('http://localhost:3000/tweets')
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        todosLosTweets = datosRecibidos;
      
        //localStorage.setItem("todosUsuarios", JSON.stringify(datosRecibidos))
        cargaTodosTweets();
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

}


function pedirTodosTweetsDeUno(arroba){
    let datosRecibidos;
  
    fetch('http://localhost:3000/tweetsU/' + arroba)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        tweetsDeUno = datosRecibidos;
        if(arroba == infoPersona[0]["Username"] ){
            cargaTweetsPropios();
        }
        else{
            pedirInfoDeUno(arroba);
        }

        
      
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

}

function pedirTodosReTweets(arroba){
    let datosRecibidos;
  
    fetch('http://localhost:3000/retweetToPost/' + arroba)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        tweetsDeUno = datosRecibidos;
        cargaRetweetsPropios();
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

}


function pedirInfoDeUno(arroba){
    var nombreDeUsuario = arroba;
    let inputUsuario;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            activarModalError("No se pudo obtener la información del usuario");
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        inputUsuario = data;
        infoPersona = inputUsuario;
        cargarDatosPersona(arroba);
        

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

  

