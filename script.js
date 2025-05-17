let cont = 0;
let imagenes = ["images/carrouse1.jpg",
                "images/carrouse2.jpg",
                "images/carrouse3.jpg",
                "images/carrouse4.jpg",
                "images/carrouse5.jpg",
                "images/carrouse6.jpg",
                "images/carrouse7.jpg",
                "images/carrouse8.jpg",
                ];
let imgElement = document.querySelector(".imgcarrousel");
imgElement.src = imagenes[0];
imgElement.classList.add("active");
let btnAdelante = document.querySelector(".adelante");
let btnAtras = document.querySelector(".atras");
function forward(){
    imgElement.classList.remove("active");
    
    // Cambiar la imagen después de un pequeño retraso
    setTimeout(() => {
        cont++;
        if (cont > imagenes.length - 1) {
            cont = 0;
        }
        imgElement.src = imagenes[cont];
        imgElement.classList.add("active"); // Añadir clase 'active' a la nueva imagen
    }, 300);
}
btnAdelante.addEventListener("click",forward);
function back(){
    imgElement.classList.remove("active");

    setTimeout(() => {
        cont--;
        if (cont < 0) {
            cont = imagenes.length - 1;
        }
        imgElement.src = imagenes[cont];
        imgElement.classList.add("active");
    }, 300);
}
btnAtras.addEventListener("click",back);
function validar() {
    let usuario = document.getElementById("nombre");    
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("email");
    let localidad = document.getElementById("localidad");
    let mensaje = document.getElementById("mensaje");

    let invalidado = false;

    document.getElementById("info").style.display = "none";
    let div = document.getElementById("infoCliente");
    if (div) {
        div.remove();
    }

    let errores = document.querySelectorAll('.error');
    for (let error of errores) {
        error.remove();
    }
    


    function crearMensajeError(campo, mensaje) {
        let obligatorio = document.createElement("div");
        obligatorio.className = "error";       
        obligatorio.appendChild(document.createTextNode(mensaje));
        campo.insertAdjacentElement("afterend", obligatorio);
    }


    let nombreCorrecto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (usuario.value == "") {
        crearMensajeError(usuario, "El Nombre y Apellido son obligatorios");
        invalidado = true;
    } else if (usuario.value.length > 30 || !nombreCorrecto.test(usuario.value)) {
        crearMensajeError(usuario, "Este campo debe contener solo letras y no exceder los 30 caracteres");
        invalidado = true;
    }

    let telefonoCorrecto = /^\d{10}$/;
    if (telefono.value == "") {
        crearMensajeError(telefono, "El Telefono es obligatorio")
        invalidado = true;
    }else if (!telefonoCorrecto.test(telefono.value)) {
        crearMensajeError(telefono, "Este campo solo admite 10 numeros");
        invalidado = true;
    }


    let emailCorrecto = /^[\w.+_-]+@(gmail|ulp|hotmail|yahoo|outlook)\.(com|ar)(\.org)?$/;
    if (email.value !== "") {
        if (!emailCorrecto.test(email.value)) {
            crearMensajeError(email, "Error al ingresar el Correo Electronico");
            invalidado = true;
        }
    }

    if (localidad.value!=="") {
        if (!nombreCorrecto.test(localidad.value)) {
            crearMensajeError(localidad,"La localidad no puede contener simbolos o numeros")
            invalidado = true;
        }
    }
    
    if (mensaje.value=="") {
        crearMensajeError(mensaje,"Este campo es obligatorio");
        invalidado = true;
    }

    if (!invalidado) {
       
        let resultado = document.createElement("div");
        resultado.className = "resultado";
        resultado.id = "infoCliente";
        if (email.value=="" && localidad.value=="") {            
            resultado.appendChild(document.createTextNode("Cliente: " + usuario.value+" / Telefono: "+telefono.value));
        } else if (email.value!=="" && localidad.value=="") {
            resultado.appendChild(document.createTextNode("Cliente: " + usuario.value+" / Telefono: "+telefono.value+" / Mail: "+email.value));
        } else if (email.value=="" && localidad.value!=="") {
            resultado.appendChild(document.createTextNode("Cliente: " + usuario.value+" / Telefono: "+telefono.value+" / Localidad: "+localidad.value));       
        } else {
            resultado.appendChild(document.createTextNode("Cliente: " + usuario.value+" / Telefono: "+telefono.value+" / Mail: "+email.value+" / Localidad: "+localidad.value));
        }
        resultado.appendChild(document.createElement("br"));
        resultado.appendChild(document.createTextNode("Pronto nos comunicaremos contigo."));

        document.getElementById("info").style.display = "block";
        let abajo = document.getElementById("resultado");
        abajo.appendChild(resultado);


        usuario.value = "";
        telefono.value = "";
        email.value = "";
        localidad.value = "";
        mensaje.value = "";

        usuario.focus();

    }

    return false;
}

