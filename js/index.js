const slot1 = [
  "aguacate",
  "ajo",
  "cebolla",
  "pepino",
  "puerro",
  "tomate",
  "zanahoria",
];
const slot2 = [
  "aguacate",
  "ajo",
  "cebolla",
  "pepino",
  "puerro",
  "tomate",
  "zanahoria",
];
const slot3 = [
  "aguacate",
  "ajo",
  "cebolla",
  "pepino",
  "puerro",
  "tomate",
  "zanahoria",
];

let jugada = [];
let repetidas;
let contadorMonedas = 0;
let contadorTiradas = 0;
let monedasInicial = 0;

//Referencias al DOM
const divFruta1 = document.querySelector("#fruta1");
const divFruta2 = document.querySelector("#fruta2");
const divFruta3 = document.querySelector("#fruta3");
const btnJugar = document.querySelector("#btnJugar");
const slotsFrutas = document.querySelectorAll(".slot-fruta");
const contador = document.querySelector("#contador");
const btnMonedas = document.querySelector("#moneda");
const divTabla = document.querySelector("#divTabla");
const filasResultados=document.querySelector("#resultados-jugadas");
const divPremios=document.querySelector("#premio");
const btnSalir=document.querySelector("#salir");

contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
btnJugar.disabled = true;
btnSalir.disabled = true;



//Función para insertar moneda
const insertarMoneda = () => {
  contadorMonedas++;
  contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
  btnJugar.disabled = false;
  filasResultados.innerHTML="";
  divTabla.classList.add("oculto");
};

//Función para realizar una jugada
const jugar = () => {
    monedasInicial=contadorMonedas;
    btnSalir.disabled = false;
    btnMonedas.disabled = true;
    btnJugar.disabled=true;
    divTabla.classList.remove("oculto");
    divPremios.innerHTML="";
    --contadorMonedas;
    ++contadorTiradas;
    
    contador.innerHTML = `<h3>${contadorMonedas}</h3>`;

    //Vacío el contenedor de las frutas
    divFruta1.innerHTML = "";
    divFruta2.innerHTML = "";
    divFruta3.innerHTML = "";

    //Tirada aleatoria de 3 frutas
    const fruta1 = slot1[shuffle(slot1)];
    const fruta2 = slot2[shuffle(slot2)];
    const fruta3 = slot3[shuffle(slot3)];

    //Almacena resultado en un array para comprobar premio
    jugada[0] = fruta1;
    jugada[1] = fruta2;
    jugada[2] = fruta3;

    console.log(jugada);
    console.log(fruta1);
    console.log(fruta2);
    console.log(fruta3);

    //Pinta en el html la imagen correspondiente a la fruta aleatoria
    setTimeout(() => {
      // Timeout para que se pinten en una secuencia, no todas a la vez
      const imgFruta1 = document.createElement("img");
      imgFruta1.id = "fruta";
      imgFruta1.src = `img/${fruta1}.png`;
      imgFruta1.classList.add("slot-fruta");
      divFruta1.append(imgFruta1);
    }, 700);

    setTimeout(() => {
      const imgFruta2 = document.createElement("img");
      imgFruta2.src = `img/${fruta2}.png`;
      imgFruta2.classList.add("slot-fruta");
      divFruta2.append(imgFruta2);
    }, 1400);

    setTimeout(() => {
      const imgFruta3 = document.createElement("img");
      imgFruta3.src = `img/${fruta3}.png`;
      imgFruta3.classList.add("slot-fruta");
      divFruta3.append(imgFruta3);
      btnJugar.disabled=false;
    }, 2100);

    //Contar frutas diferentes
    const cantidadFrutas = jugada.reduce((contadorFruta, fruta) => {
      contadorFruta[fruta] = (contadorFruta[fruta] || 0) + 1;
      return contadorFruta;
    }, {});

    console.log(cantidadFrutas);

    //premios
    if (cantidadFrutas.zanahoria == 2) {
      console.log("Ganaste 4 monedas");
      contadorMonedas+=4;
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-success">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">4</td>
        <td>${contadorMonedas}</td>
        </tr>`) ;
        divPremios.innerHTML = '<img src="img/pila-de-monedas.png" alt="premio"> Ganaste 4 monedas!';
      },2500)
    } else if (cantidadFrutas.zanahoria == 3) {
      console.log("Ganaste 10 monedas");
      contadorMonedas+=10;
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-success">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">10</td>
        <td>${contadorMonedas}</td>
        </tr>`) ;
        divPremios.innerHTML = '<img src="img/pila-de-monedas.png" alt="premio"> ¡PLENO! Ganaste 10 monedas!'
      },2500)
    } else if (
      cantidadFrutas.aguacate == 3 ||
      cantidadFrutas.ajo == 3 ||
      cantidadFrutas.cebolla == 3 ||
      cantidadFrutas.pepino == 3 ||
      cantidadFrutas.puerro == 3 ||
      cantidadFrutas.tomate == 3
    ) {
      console.log("Ganaste 3 monedas");
      contadorMonedas+=3;
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-success">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">3</td>
        <td>${contadorMonedas}</td>
    </tr>`) ;
    divPremios.innerHTML = '<img src="img/pila-de-monedas.png" alt="premio"> Ganaste 3 monedas!'
      },2500)
    } else if (
      (cantidadFrutas.aguacate == 2 ||
        cantidadFrutas.ajo == 2 ||
        cantidadFrutas.cebolla == 2 ||
        cantidadFrutas.pepino == 2 ||
        cantidadFrutas.puerro == 2 ||
        cantidadFrutas.tomate == 2) &&
      cantidadFrutas.zanahoria == 1
    ) {
      console.log("Ganaste 3 monedas");
      contadorMonedas+=3;
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-success">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">3</td>
        <td>${contadorMonedas}</td>
    </tr>`) ;
    divPremios.innerHTML = '<img src="img/pila-de-monedas.png" alt="premio"> Ganaste 3 monedas!'
      },2500)
    } else if (
      cantidadFrutas.aguacate == 2 ||
      cantidadFrutas.ajo == 2 ||
      cantidadFrutas.cebolla == 2 ||
      cantidadFrutas.pepino == 2 ||
      cantidadFrutas.puerro == 2 ||
      cantidadFrutas.tomate == 2
    ) {
      console.log("Ganaste 2 monedas");
      contadorMonedas+=2;
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-success">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">2</td>
        <td>${contadorMonedas}</td>
    </tr>`) ;
    divPremios.innerHTML = '<img src="img/pila-de-monedas.png" alt="premio"> Ganaste 2 monedas!'
      },2500)
    } else if (cantidadFrutas.zanahoria == 1) {
      console.log("Ganaste 1 moneda");
      contadorMonedas+=1;
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-light">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">1</td>
        <td>${contadorMonedas}</td>
    </tr>`) ;
    divPremios.innerHTML = '<img src="img/pila-de-monedas.png" alt="premio"> Ganaste 1 moneda!'
      },2500)
    }else{
      setTimeout(()=>{
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML("beforeend",`<tr class="table-danger">
        <td>${contadorTiradas}</td>
        <td style="color:brown;">-1</td>
        <td style="color:#154946;">0</td>
        <td>${contadorMonedas}</td>
    </tr>`) ;
    divPremios.innerHTML = '<img src="img/triste.png" alt="premio" width="46px">'
      },2500)
    }
   setTimeout(()=>{
    if (contadorMonedas==0){
      btnJugar.disabled=true;
      btnMonedas.disabled=false;
      contadorTiradas=0;
      alert("Te has gastado todas las monedas");
    }
   },2800)
    
};

// Función para obtener un número al azar con el límite de la longitud del array
function shuffle(array) {
  let fruta, i;
  i = Math.floor(Math.random() * array.length);

  fruta = array[i];
  console.log(i);
  return i;
}
function salir (){
  btnJugar.disabled=true;
      btnMonedas.disabled=false;
      contadorTiradas=0;
      divPremios.innerHTML='';
      alert(`Fin del juego. Empezaste con ${monedasInicial} monedas y ahora tienes ${contadorMonedas}`)
      contadorMonedas=0;
      contador.innerHTML=`<h3>${contadorMonedas}</h3>`;
}
// Eventos
//Tirada al hacer clic
btnJugar.addEventListener("click", jugar);
btnMonedas.addEventListener("click", insertarMoneda);
btnSalir.addEventListener("click", salir);
