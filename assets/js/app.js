
var palabras = [
    "ALURA",
    "PROGRAMA",
    "MUNDO",
    "WEB",
    "COMPUTADORA",
    "JAVASCRIPT",
    "PERRO",
    "ARBOL",
    "CARRO",
    "ROMBO"
];

var abecedario = [
    "A", "B", "C", "D", "E", "F", 
    "G", "H", "I", "J", "K", "L", 
    "M", "N", "Ñ", "O", "P", "Q", 
    "R", "S", "T", "U", "V", "W", 
    "X", "Y", "Z"
];

let input_palabra = document.querySelector('#txt-palabra');

function agregarPalabra(){
    palabra = input_palabra.value.toUpperCase();
    bandera = true;

    if(palabra == ""){
        bandera = false; 
        errorPalabra("no es válida");
    } 

    if(bandera){
        if(palabras.includes(palabra)) {
            bandera = false; 
            errorPalabra("ya existe");
        }
    }

    if(bandera){
        for (let i = 0; i < palabra.length; i++) {
            if(!abecedario.includes(palabra[i])){
                bandera = false; 
                errorPalabra("no es válida");
            } 
        }
    }

    if(bandera) guardarPalabra(palabra);
}

function guardarPalabra(palabra){
    palabras.push(palabra);
    input_msg.classList.remove('hidden');
    input_msg.classList.remove('msg-error');
    input_msg.classList.add('msg-success');
    input_msg.innerText = "La palabra '"+ palabra + "' se agregó a la lista correctamente";
    input_palabra.value = "";
}

function errorPalabra(motivo){
    input_msg.classList.remove('hidden');
    input_msg.classList.remove('msg-success');
    input_msg.classList.add('msg-error');
    input_msg.innerText = `La palabra "${palabra}" ${motivo}`;
}

function mostrarAjustes(){
    seccion_menu_principal.classList.add('hidden');
    seccion_ajustes.classList.remove('hidden');
}

function salir(){
    seccion_menu_principal.classList.remove('hidden');
    seccion_ajustes.classList.add('hidden');
    input_msg.classList.add('hidden');
}


