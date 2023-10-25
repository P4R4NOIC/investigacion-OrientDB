
// var jsonData = [
//     {
//     "username": "gjimenez",
//     "nombre": "Gabriel",
//     "descripcion": "Duende tu sabes que la amo"
//     },
//     {
//     "username": "rvindas",
//     "nombre": "Roberto",
//     "descripcion": "Jugador profesional de UNO"
//     },
//     {
//     "username": "dylantables",
//     "nombre": "Dylan",
//     "descripcion": "Sin descripcion"
//     }
// ];

// var jsonString = JSON.stringify(jsonData);
// localStorage.setItem("todosSeguidores", jsonString);

function activarModalVerSeguidores(){
    var myModalEl = document.querySelector('#modalSeguidores')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
    modal.show()
}

function pedirSeguidores(){
    let usuarioJSON = localStorage.getItem("usuario");
    var usuario = JSON.parse(usuarioJSON);
    var username = usuario[0].Username; 
    let datosRecibidos;
    // ------------------------------- FETCH ESTUDIANTES
    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/seguidores/'+username)
    .then(response => {
        if (!response.ok) {
            alert('No se pudo obtener la información del usuario');
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        datosRecibidos = data;
        localStorage.setItem("todosSeguidores", JSON.stringify(datosRecibidos))
        cargarSeguidores();
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
    
}

function cargarSeguidores(){
    let todosSeguidores = JSON.parse(localStorage.getItem("todosSeguidores"));
    todosSeguidores.forEach(function (seguidor) {

        var cajaSeguidor = document.createElement("div");
        var col1 = document.createElement("div");
        var col10 = document.createElement("div");
        var row = document.createElement("div");
        var secondRow = document.createElement("div");
        var imagen = document.createElement("img");
        var a_element = document.createElement("a");
        

        a_element.classList = "mandaPerfil";
        a_element.href = "#";
        a_element.innerHTML = seguidor.NombreUsuario + " - @" + seguidor.Username;
        a_element.setAttribute("arroba", seguidor.Username);
        a_element.onclick = function (){
            
            actualizarVistaPerfilActual(a_element.getAttribute("arroba"));
            
        };

        row.appendChild(a_element);
        row.classList = "row";

        secondRow.classList = "row";
        secondRow.innerHTML = seguidor.Estado;

        col10.appendChild(row);
        col10.appendChild(secondRow);
        col10.classList = "col-10";

        imagen.src = "../Miscelaneo/person.png";
        imagen.alt = "Foto Perfil";
        imagen.classList = "img-thumbnail fotoPerfilPeq";

        col1.appendChild(imagen);
        col1.classList = "col-1";

        cajaSeguidor.appendChild(col1);
        cajaSeguidor.appendChild(col10);
        cajaSeguidor.classList = "row cajaSeguidor";

        document.querySelector(".contenedorSeguidores").appendChild(cajaSeguidor);
    })

}

function actualizarVistaPerfilActual(arroba){
    document.getElementById("seguidoresPersona").textContent = infoPersona["seguidores"];
    document.getElementById("siguiendoPersona").textContent = infoPersona["siguiendo"];
    document.getElementById("estadoPersona").textContent = infoPersona["estado"];
    document.getElementById("fecNacPersona").textContent = infoPersona["fechaNacimiento"];
    document.getElementById("usrNamePersona").textContent = infoPersona["nombreUsuario"];
    document.getElementById("arrPersona").textContent = infoPersona["Username"];

    document.getElementById("botonPerfil").textContent = "Seguir";
    document.getElementById("botonPerfil").classList = "boton botonCrea botonSeguir"
    document.getElementById("botonPerfil").onclick = function(){
        seguirPersona(arroba);
    }
    
    for(var i = 0; i < todosLosTweets.length; i++){
        document.getElementById("tweet").remove();
    }
    
    for(var i = 0; i < tweetsDeUno.length; i++){
        var tweet = tweetsDeUno[i]["Texto"];
        var numRetweets = parseInt(tweetsDeUno[i]["Retweets"]);
        var numComments = tweetsDeUno[i]["Comentarios"].length;
        var headder = tweetsDeUno[i]["nombreUsuario"] + "  " +  "- " + tweetsDeUno[i]["Username"] + "  " + "-" + "  " + tweetsDeUno[i]["FechaPublicacion"]
        haceTweet(tweet, headder, numRetweets, numComments, tweetsDeUno[i]["Comentarios"], tweetsDeUno[i]["@rid"], tweetsDeUno[i]["Username"]);
        
    }
}