
// var jsonData = [
//     {
//     "username": "gjimenez",
//     "nombre": "Gabriel",
//     "descripcion": "Duende tu sabes que la amo"
//     },
//     {
//     "username": "rvindas",
//     "nombre": "Roberto Vindas",
//     "descripcion": "Jugador profesional de UNO"
//     },
//     {
//     "username": "dylantables",
//     "nombre": "Dylan",
//     "descripcion": "Sin descripcion"
//     }
// // ];
// var jsonString = JSON.stringify(jsonData);
// localStorage.setItem("todosUsuarios", jsonString);
  


function activarModalBusqueda(){
    var myModalEl = document.querySelector('#modalBusqueda')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
    modal.show()
}



function pedirPersonas(){
    let datosRecibidos;
    // ------------------------------- FETCH ESTUDIANTES
    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/usuarios')
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("todosUsuarios", JSON.stringify(datosRecibidos))
        cargarPersonas();
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
    
}

function cargarPersonas(){
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var usuarioConectado = usuario[0].Username; 

    let todosUsuarios = JSON.parse(localStorage.getItem("todosUsuarios"));
    todosUsuarios.forEach(function (usuario) {
        if (usuarioConectado != usuario.Username){
            var persona = usuario.NombreUsuario + " - @" + usuario.Username;
            var ele = document.createElement("a")
            ele.classList = "personas list-group-item list-group-item-dark"
            ele.href = "#";
            ele.role = "tab";
            ele.innerHTML = persona;
            ele.title = usuario.Username;
            ele.onclick = function (){
            
                actualizarVistaPerfilActualLlamada(usuario.Username);
                
            };
            document.querySelector(".listas").appendChild(ele);
        }
    })

}


function buscarPersona(){
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('personas');

    for (i =0; i < x.length; i++){
        if (!x[i].innerHTML.toLocaleLowerCase().includes(input)){
            x[i].style.display = "none";
        }
        else{
            x[i].style.display = "list-item";
        }
    }
}



function actualizarVistaPerfilActualLlamada(arroba){
    pedirTodosTweetsDeUno(arroba);
}

function actualizarVistaPerfilActual(arroba){
    
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