
//FUNCION EN LOGIN
function validaCorreo() {
    
    var arroba = document.getElementById("inputEmail").value
    var arrobaValido = /^@?(\w){1,15}$/
    var contrasena = document.getElementById("inputPassword").value
    

    //BORRAR-----------------------
    /* if (correoValido.test(arroba) && contrasena != "")
    {
        localStorage.setItem("conexion", "ESTUD")
        localStorage.setItem("usuario", arroba)
        location.href = "../Archivos HTML/landingPage.html"  
        // ------------------------------------------------------------------------------- //
      
    }  */
    
    //BORRAR------------------------
    
    if (arrobaValido.test(arroba)){
        logIn(arroba,contrasena);
    }
}

function logIn(arroba,contrasena){
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
        localStorage.setItem("usuario", JSON.stringify(inputUsuario))
        
        let usuarioJSON = localStorage.getItem("usuario");
        var usuario = JSON.parse(usuarioJSON);
        var contraUsuario = usuario.contra; 
        if(contrasena === contraUsuario){
            location.href = "../Archivos HTML/landingPage.html"
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
