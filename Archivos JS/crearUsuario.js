
// RECIBE EL FORMULARIO
document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formulario");

    formulario.addEventListener ("submit", function(event) {
        //EVITA QUE SE ENVIE
        event.preventDefault();
        //-----------------//
        
        var arrobaValido = /^@?(\w){1,15}$/


        let usuario = document.getElementById("inputUsuario").value;
        let contrasena = document.getElementById("inputContraseña").value;
        let contraConfirma = document.getElementById("inputConfContraseña").value;
        let primNombre = document.getElementById("inputPrimNombre").value;
        let fecNac = document.getElementById("birthday").value;
        
        //Convierte en JSON
        let datosUsuario = {
            FechaNacimiento: fecNac,
            Username: usuario,
            Contra: contrasena,
            NombreUsuario: primNombre
        };
        let datosUsuarioJSON = JSON.stringify(datosUsuario);

        
        // REGISTRA USUARIOS COMO ESTUDIANTE
        
        if(
        arrobaValido.test(usuario)  && 
        contrasena != "" && 
        contraConfirma != "" && 
        primNombre != "" &&  
        fecNac != ""){
            if(contrasena == contraConfirma){
                //GUARDA EN BASE DE DATOS
                registrarUsuario(datosUsuarioJSON);
                alert("Sus datos han sido guardados")
                history.back();
            }else{
                alert("Las contraseñas no coinciden")
            }
        }else{
            alert("Entradas inválidas")
        }

    });
});

function registrarUsuario(datosUsuarioJSON){
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: datosUsuarioJSON
    })
}
