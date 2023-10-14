
//FUNCION EN LOGIN
function validaCorreo() {
    location.href = "../Archivos HTML/landingPage.html"  
    var email = document.getElementById("inputEmail").value
    var correoEstudianteValido = /^[\w-\.]+@(estudiantec.cr)$/
    var contrasena = document.getElementById("inputPassword").value
    

    //BORRAR-----------------------
    if (correoEstudianteValido.test(email) && contrasena != "")
    {
        localStorage.setItem("conexion", "ESTUD")
        localStorage.setItem("usuario", email)
        location.href = "../../Archivos HTML/Archivos Estudiante/lobbyEstudiante.html"
        // ------------------------------------------------------------------------------- //
      
    } 
    
    //BORRAR------------------------
    
}

function logInEstudiante(email,contrasena){
    var nombreDeUsuario = email;
    let inputUsuario;
    // Hacer la solicitud GET al servidor
    fetch('http://localhost:3000/Usuario/'+nombreDeUsuario)
    .then(response => {
        if (!response.ok) {
            activarModalError("No se pudo obtener la información del usuario");
        }
        return response.json(); // Parsea la respuesta JSON
    })
    .then(data => {
        // Datos recibidos
        inputUsuario = data;
        localStorage.setItem("usuario", JSON.stringify(inputUsuario))
        
        let usuarioJSON = localStorage.getItem("usuario");
        var usuario = JSON.parse(usuarioJSON);
        var contraUsuario = usuario.contra; 
        if(contrasena === contraUsuario){
            localStorage.setItem("conexion", "ESTUD")
            location.href = "../../Archivos HTML/Archivos Estudiante/lobbyEstudiante.html"
        }else{
            localStorage.removeItem("usuario");
            activarModalError("La contraseña o el usuario son invalidos");
        }
        

    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}

function activarModalError(error){
    var myModalEl = document.querySelector('#myModal')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl)
    modal.show()
    document.getElementById("inputEmail").value = ""
    document.getElementById("inputPassword").value = ""
    var textoModal = document.querySelector(".modal-body");
    textoModal.textContent = error;
}
