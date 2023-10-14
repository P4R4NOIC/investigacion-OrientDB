



function prueba(){
   var label =  document.createElement("label");
   label.setAttribute("gustado", "no");
   label.textContent = "sirve";
   label.id = "algo";

   document.getElementById("p").appendChild(label);

   console.log(document.getElementById("algo").getAttribute("gustado"))
   haceTweet();
}



function haceTweet(){
    
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


    var img = document.createElement("img");

    
    var label1 = document.createElement("label");
    var label2 = document.createElement("label");
    var label3 = document.createElement("label");
    var label4 = document.createElement("label");
    var label5 = document.createElement("label");
    var label6 = document.createElement("label");

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
    a2.textContent = "Fernando Gross  -  @fgross  -  14/10/23" //CAMBIAR LUEGO

    div4.appendChild(a2);
    div3.appendChild(div4);

    div5.classList = "row";
    div5.id = "tweetText";
    div5.textContent = "Si la vida te da la espalda pegale una nalgada (para pensar amigos)" //CAMBIAR LUEGO

    div3.appendChild(div5);

    div6.classList = "row";

    div7.classList = "filaAbajo";

    a3.href = "#"
    a3.classList = "respuestas";

    label1.for = "";
    label1.classList = "textos sigue init";
    label1.textContent = "Likes: ";

    label2.for = "";
    label2.classList = "textos sigue";
    label2.textContent = "2";  //CAMBIAR LUEGO

    a3.appendChild(label1);
    a3.appendChild(label2);

    div7.appendChild(a3);

    label3.for = "";
    label3.classList = "textos sigue init abajo";
    label3.textContent = "ReTECs:" + ' ' ;

    label4.for = "";
    label4.classList = "textos sigue";
    label4.textContent = "200";  //CAMBIAR LUEGO

    div7.appendChild(label3);
    div7.appendChild(label4);

    a4.href = "#"
    a4.classList = "respuestas";

    label5.for = "";
    label5.classList = "textos sigue init abajo";
    label5.textContent = "Respuestas: ";

    label6.for = "";
    label6.classList = "textos sigue";
    label6.textContent = "20";  //CAMBIAR LUEGO

    a4.appendChild(label5);
    a4.appendChild(label6);

    div7.appendChild(a4);

    div6.appendChild(div7);

    div3.appendChild(div6);

    div1.appendChild(div3);

    document.getElementById("tweets").appendChild(div1);





}


