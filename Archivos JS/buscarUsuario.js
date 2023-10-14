
var jsonData = {
"usuarios": [
    {
    "username": "usuario1",
    "nombre": "Nombre1",
    "segundonombre": "SegundoNombre1",
    "primerapellido": "PrimerApellido1",
    "segundoapellido": "SegundoApellido1"
    },
    {
    "username": "usuario2",
    "nombre": "Nombre2",
    "segundonombre": "SegundoNombre2",
    "primerapellido": "PrimerApellido2",
    "segundoapellido": "SegundoApellido2"
    },
    {
    "username": "usuario3",
    "nombre": "Nombre3",
    "segundonombre": "SegundoNombre3",
    "primerapellido": "PrimerApellido3",
    "segundoapellido": "SegundoApellido3"
    }
]
};

var jsonString = JSON.stringify(jsonData);
localStorage.setItem("todosUsuarios", jsonString);
  


function activarModalError(){
    var myModalEl = document.querySelector('#myModal')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
    modal.show()
}


function cargarPagina(){
    
    //autenticar()
    
    //pedirPersonas();
    cargarPersonas();

    
}

function pedirPersonas(){
    let datosRecibidos;
    // ------------------------------- FETCH ESTUDIANTES
    // ---------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Todos-Usuarios')
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
    let todosUsuarios = JSON.parse(localStorage.getItem("todosUsuarios"));
    for (i = 0; i < todosUsuarios.length; i++) {
        var persona = todosUsuarios[i].nombre + " " + todosUsuarios[i].segundonombre + " " + todosUsuarios[i].primerapellido + " " + todosUsuarios[i].segundoapellido ;
        var ele = document.createElement("a")
        ele.classList = "personas list-group-item list-group-item-dark"
        ele.href = "#";
        ele.role = "tab";
        ele.innerHTML = persona;
        ele.title = todosUsuarios[i].username;
        ele.onclick = function (){
            
            actualizarVistaPerfilActual();
            
        };
        document.querySelector(".listas").appendChild(ele);
    }

}

function actualizarVistaPerfilActual(){
    location.href = "#";
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

