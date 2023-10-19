var actual;
var todosLosTweets = [{
                "@rid":"#al",
                "@class":"Tweet",
                "FechaPublicacion":"2023-02-22 00:00:00",
                "Retweets":"6",
                "Comentarios":[{"arroba":"@dylan",
                                "fechaComentado":"2023-02-22 00:00:00",
                                "nombreUsuario":"Dylan Mora", 
                                "comentario":"Comentario"}],
                "Texto":"Demasiado Trabajo",
                "nombreUsuario":"Fernando Gross",
                "arroba":"@fgross"
                },
                

                {
                    "@rid":"#al2",
                    "@class":"Tweet",
                    "FechaPublicacion":"2023-02-22 00:00:00",
                    "Retweets":"8",
                    "Comentarios":[{"arroba":"@fgross",
                                    "fechaComentado":"2023-02-22 00:00:00",
                                    "nombreUsuario":"Fernando Gross", 
                                    "comentario":"Chupela"},

                                    {"arroba":"@fgross",
                                    "fechaComentado":"2023-02-22 00:00:00",
                                    "nombreUsuario":"Fernando Gross", 
                                    "comentario":"Roberto"},

                                    {"arroba":"@fgross",
                                    "fechaComentado":"2023-02-22 00:00:00",
                                    "nombreUsuario":"Fernando Gross", 
                                    "comentario":"Trabaje"}],
                    "Texto":"Devuelveme a mi chica",
                    "nombreUsuario":"Roberto Vindas",
                    "arroba":"@rvindas"
                }
            ];




var todosDeUno = {};

function cargarPagina(){
    
    //autenticar()
    
    
    cargarPersonas(); //pedirPersonas(); sustituir cuando el metodo funcione
    console.log("sirve")
    cargaTodosTweets();
    
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

   console.log(document.getElementById("algo").getAttribute("gustado"))

   var tweet = "este es el cuerpo del tweet";
   var nombreUsuario = "Fernando Gross";
   var arroba = "@fgross";
   var fechaPubli = "18/10/23";
   var numLikes = 2;
   var numRetweets = 102;
   var numComments = 300;

   var headder = nombreUsuario + "  " +  "- " + arroba + "  " + "-" + "  " +fechaPubli;

   cargaTodosTweets();
   haceTweet(tweet, headder, numLikes, numRetweets, numComments);
}

function cargaTodosTweets(){
    for(var i = 0; i < todosLosTweets.length; i++){
        var tweet = todosLosTweets[i]["Texto"];
        var numRetweets = parseInt(todosLosTweets[i]["Retweets"]);
        var numComments = todosLosTweets[i]["Comentarios"].length;
        var headder = todosLosTweets[i]["nombreUsuario"] + "  " +  "- " + todosLosTweets[i]["arroba"] + "  " + "-" + "  " + todosLosTweets[i]["FechaPublicacion"]
        haceTweet(tweet, headder, numRetweets, numComments, todosLosTweets[i]["Comentarios"], todosLosTweets[i]["@rid"]);
        
    }
}

function haceTweet(tweet, headder, numRetweets, numComments, comentariosLista, rid){
    
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
   // console.log(a4.getAttribute("click"))
    a4.onclick = function(){
        if(a4.getAttribute("click") == "no"){

            console.log(a4.getAttribute("click"));
          
          
            console.log(comentariosLista);
            for(var i = 0; i < comentariosLista.length; i++){
                var comentario = haceComentario(comentariosLista[i]["nombreUsuario"], comentariosLista[i]["arroba"], comentariosLista[i]["fechaComentado"], comentariosLista[i]["comentario"]);
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
