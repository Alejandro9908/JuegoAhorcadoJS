let palabra;
let banderaGanar;
let vidas = 0;

let letrasSuccess = [];
let letrasUsadas = [];


//secciones
let seccion_menu_principal = document.querySelector(".menu-principal");
let seccion_ajustes = document.querySelector(".ajustes");

//tablero de dibujo
let tablero = document.querySelector('#tablero');
let mensaje = document.querySelector('.mensaje');
let dibujo = document.querySelector('.lienzo');
let pincel = dibujo.getContext("2d");
pincel.lineWidth = 4;

function pintarLinea(xs, ys, xe, ye, color){
    pincel.beginPath();
    pincel.strokeStyle = color;
    pincel.moveTo(xs, ys);
    pincel.lineTo(xe, ye);
    pincel.stroke();
}

function pintarCirculo(x, y, radio, color){
    pincel.fillStyle = color;
    pincel.beginPath();
    pincel.arc(x,y,radio,0,2*Math.PI);
    pincel.fill();
}

document.addEventListener('keydown', (event) => {
    let tecla = event.key;
    capturaLetra(tecla);
});

function palabraAleatoria(){
    max = palabras.length;
    num = Math.round(Math.random() * max) - 1;
    return palabras[num];
}

function prepararTableroLetras(){
    palabra = palabraAleatoria();
    tablero.innerHTML = "";
    for(let i = 0; i < palabra.length; i++){
        l = `<input class="letra" readonly id="let${i}" type="text" value="">`;
        tablero.innerHTML = tablero.innerHTML + l;
        letrasSuccess.push('-');
    }
}

function empezarJuego(){
    iniciaJuego();
    seccion_menu_principal.classList.add('hidden');
    seccion_ajustes.classList.add('hidden');
}

function iniciaJuego(){
    prepararTableroLetras();
    vidas = 9;
    resetJuego();
    letrasSuccess = [];
    letrasUsadas = [];
    banderaGanar = 0;
}


function capturaLetra(letra) {
    if((vidas > 0) && (banderaGanar < palabra.length)){
        bandera_permitido = abecedario.includes(letra.toUpperCase());
        bandera_usado = letrasUsadas.includes(letra.toUpperCase());

        if(bandera_permitido == true && bandera_usado == false) validarLetra(letra.toUpperCase());
        else console.log('tecla no permitida');
    }
}
    

function validarLetra(letra){
    let bandera = banderaGanar;
    letrasUsadas.push(letra);

    palabra.split('').forEach((element, i) => {
        if(element === letra){
            banderaGanar++;
            asignarLetra(letra, i);
        }
    });
    
    if(banderaGanar <= bandera){
        editarTecla(letra, 'error');
        validarVida();
    }else{
        editarTecla(letra, 'success');
    }

    if(banderaGanar == palabra.length){
        mensajeJuegoterminado("Juego completado :D", "win");
    }
}

function validarVida() {
    vidas--;

    switch(vidas){
        case 8: 
            pintarLinea(10, 0, 10, 200,"#072B61");
            break;
        case 7: 
            pintarLinea(10, 2, 160, 2,"#072B61");
            break;
        case 6: 
            pintarLinea(160, 0, 160, 20,"#072B61");
            break;
        case 5: 
            pintarCirculo(160,40,25,"#072B61");
            pintarCirculo(160,40,21,"#FFF");
            break;
        case 4: 
            pintarLinea(160, 61, 160, 140,"#072B61");
            break;
        case 3: 
            pintarLinea(160, 70, 135, 110,"#072B61");
            break;
        case 2: 
            pintarLinea(160, 70, 185, 110,"#072B61");
            break;
        case 1: 
            pintarLinea(160, 140, 135, 180,"#072B61");
            break;
        case 0: 
            pintarLinea(160, 140, 185, 180,"#072B61");
            break;
        default: break;
    }
    
    if(vidas == 0){
        mensajeJuegoterminado("Juego terminado :(", "fail");
    }
    
}

function mensajeJuegoterminado(texto, color){
    mensaje.classList.add('show-mensaje');
    mensaje.classList.add('color-'+color);
    mensaje.innerText = texto
}

function asignarLetra(letra, indice){
    let input = document.getElementById('let'+indice);
    input.value = letra
}

function editarTecla(letra, opcion){
    let tecla = document.getElementById(letra);
    tecla.classList.add("btn-" + opcion);
    tecla.disabled = true;
}

function resetJuego(){
    let teclas = document.querySelectorAll('.btn-teclado');

    teclas.forEach(tecla => {
        tecla.classList.remove("btn-success");
        tecla.classList.remove("btn-error");
        tecla.disabled = false;
    });

    mensaje.classList.remove('show-mensaje');
    mensaje.classList.remove('color-win');
    mensaje.classList.remove('color-fail');
    mensaje.innerText = ""

    pincel.clearRect(0, 0, dibujo.width, dibujo.height);
    
}



