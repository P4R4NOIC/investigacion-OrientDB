
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
                
                actualizarVistaPerfilActual(usuario.Username);
                
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

