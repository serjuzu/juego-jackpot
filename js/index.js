(()=>{
  "use strict";

  //Arrays para los tres slots de la máquina. Podría optimizarse a un sólo array.
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
  
  //Inicialización de variables
  let jugada = []; //Almacena la jugada resultante
  let contadorMonedas = 0; //Monedas que hemos introducido
  let contadorTiradas = 0; //nº de tirada
  let monedasInicial = 0;  //Monedas al comienzo del juego. Usada para el mensaje de Salir
  
  //Referencias al DOM
  const divFruta1 = document.querySelector("#fruta1");
  const divFruta2 = document.querySelector("#fruta2");
  const divFruta3 = document.querySelector("#fruta3");
  const btnJugar = document.querySelector("#btnJugar");
  const slotsFrutas = document.querySelectorAll(".slot-fruta");
  const contador = document.querySelector("#contador");
  const btnMonedas = document.querySelector("#moneda");
  const divTabla = document.querySelector("#divTabla");
  const filasResultados = document.querySelector("#resultados-jugadas");
  const divPremios = document.querySelector("#premio");
  const btnSalir = document.querySelector("#salir");
  const modalInfo = document.querySelector("#info");
  const cierreInfo = document.querySelector("#cerrar-info")
  
  
  //Inicialización al cargar la página: pinta el contador de monedas y desactiva el botón de jugar y salir.
  contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
  btnJugar.disabled = true;
  btnSalir.disabled = true;
  
  /* Función para insertar moneda:
  -Actualiza contadores
  - pinta el contador de monedas en el html
  - activa el botón de jugar
  - borra la tabla de resultados anteriores y la oculta
  - reproduce el sonido de inserción de moneda
   */
  const insertarMoneda = () => {
    contadorMonedas++;
    monedasInicial++;
    contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
    btnJugar.disabled = false;
    filasResultados.innerHTML = "";
    divTabla.classList.add("oculto");
    
    var a = new Audio('sounds/1.wav'); 
    a.play();
  };
  
  // Función para obtener un número al azar con el límite de la longitud del array
  function shuffle(array) {
    let  i;
    i = Math.floor(Math.random() * array.length);
    console.log(i);
    return i;
  }
  
  //Función que borra los contenedores de las frutas
  const vaciarFrutas = ()=>{
    divFruta1.innerHTML = "";
    divFruta2.innerHTML = "";
    divFruta3.innerHTML = "";
  }
  
  /* Función Principal: Realizar una jugada */
  const jugar = () => {
    //reproduce sonido de activar jugada
    var a = new Audio('sounds/2.wav'); 
    a.play();
    //activa y desactiva los botones que corresponden
    btnSalir.disabled = false;
    btnMonedas.disabled = true;
    btnJugar.disabled = true;
    divTabla.classList.remove("oculto"); 
    divPremios.innerHTML = "";
    --contadorMonedas;
    ++contadorTiradas;
    
    contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
    
    //Vacío el contenedor de las frutas
    vaciarFrutas();
    
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
      imgFruta1.id = "fruta1";
      imgFruta1.src = `img/${fruta1}.png`;
      imgFruta1.classList.add("slot-fruta");
      divFruta1.append(imgFruta1);
      var a = new Audio('sounds/3.wav'); 
        a.play();
    }, 700);
  
    setTimeout(() => {
      const imgFruta2 = document.createElement("img");
      imgFruta2.id = "fruta2";
      imgFruta2.src = `img/${fruta2}.png`;
      imgFruta2.classList.add("slot-fruta");
      divFruta2.append(imgFruta2);
      var a = new Audio('sounds/3.wav'); 
        a.play();
    }, 1400);
  
    setTimeout(() => {
      const imgFruta3 = document.createElement("img");
      imgFruta3.id = "fruta3";
      imgFruta3.src = `img/${fruta3}.png`;
      imgFruta3.classList.add("slot-fruta");
      divFruta3.append(imgFruta3);
      btnJugar.disabled = false;
      var a = new Audio('sounds/3.wav'); 
        a.play();
    }, 2100);
  
    //Contar frutas diferentes. Me devuelve un objeto literal {fruta:cantidad}
    const cantidadFrutas = jugada.reduce((contadorFruta, fruta) => {
      contadorFruta[fruta] = (contadorFruta[fruta] || 0) + 1;
      return contadorFruta;
    }, {});
  
    console.log(cantidadFrutas);
  
    /* Premios. Actualiza el contador de monedas, lo pinta,inserta en la tabla resumen 
    el resultado de la jugada y pinta una frase con el premio obtenido. En los premios
    mayores reproduce un sonido */
    if (cantidadFrutas.zanahoria == 2) {
      console.log("¡Enhorabuena! Has ganado 4 monedas");
      contadorMonedas += 4;
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">4</td>
          <td>${contadorMonedas}</td>
          </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/pila-de-monedas.png" alt="premio"> ¡Enhorabuena! Has ganado 4 ';
          var a = new Audio('sounds/4.wav'); 
        a.play();
      }, 2500);
    } else if (cantidadFrutas.zanahoria == 3) {
      console.log("¡¡PLENO!! Has ganado 10 monedas");
      contadorMonedas += 10;
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">10</td>
          <td>${contadorMonedas}</td>
          </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/pila-de-monedas.png" alt="premio"> ¡¡PLENO!! Has ganado 10 ';
        var a = new Audio('sounds/4.wav'); 
        a.play();
      }, 2500);
    } else if (
      cantidadFrutas.aguacate == 3 ||
      cantidadFrutas.ajo == 3 ||
      cantidadFrutas.cebolla == 3 ||
      cantidadFrutas.pepino == 3 ||
      cantidadFrutas.puerro == 3 ||
      cantidadFrutas.tomate == 3
    ) {
      console.log("Ganaste 3 monedas");
      contadorMonedas += 3;
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">3</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/pila-de-monedas.png" alt="premio"> ¡No está mal! Ganas 3';
          var a = new Audio('sounds/4.wav'); 
        a.play();
      }, 2500);
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
      contadorMonedas += 3;
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">3</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/pila-de-monedas.png" alt="premio"> ¡No está mal! Ganas 3';
          var a = new Audio('sounds/4.wav'); 
          a.play(); 
      }, 2500);
    } else if (
      cantidadFrutas.aguacate == 2 ||
      cantidadFrutas.ajo == 2 ||
      cantidadFrutas.cebolla == 2 ||
      cantidadFrutas.pepino == 2 ||
      cantidadFrutas.puerro == 2 ||
      cantidadFrutas.tomate == 2
    ) {
      console.log("Ganaste 2!");
      contadorMonedas += 2;
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-success">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">2</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/pila-de-monedas.png" alt="premio"> Menos es nada, ¡ganas 2!';
      }, 2500);
    } else if (cantidadFrutas.zanahoria == 1) {
      console.log("Ganaste 1 moneda");
      contadorMonedas += 1;
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-light">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">1</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/pila-de-monedas.png" alt="premio"> Al menos recuperas tu moneda...';
      }, 2500);
    } else {
      setTimeout(() => {
        contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
        filasResultados.insertAdjacentHTML(
          "beforeend",
          `<tr class="has-background-danger">
          <td>${contadorTiradas}</td>
          <td style="color:brown;">-1</td>
          <td style="color:#154946;">0</td>
          <td>${contadorMonedas}</td>
      </tr>`
        );
        divPremios.innerHTML =
          '<img src="img/triste.png" alt="premio" width="46px">';
      }, 2500);
    }
  
    //Comprobación de si se han agotado las monedas para concluir el juego
    setTimeout(() => {
      if (contadorMonedas == 0) {
        btnJugar.disabled = true;
        btnMonedas.disabled = false;
        contadorTiradas = 0;
        monedasInicial = 0;
        alert("Te has gastado todas las monedas.");
        btnSalir.disabled = true;
      }
    }, 2800);
  };
  
  
  //Función del botón salir. Resetea el juego y nos da un alert con el resultado obtenido.
  function salir() {
    btnJugar.disabled = true;
    btnMonedas.disabled = false;
    contadorTiradas = 0;
    divPremios.innerHTML = "";
    alert(
      `Fin del juego. Empezaste con ${monedasInicial} monedas y ahora tienes ${contadorMonedas}.`
    );
    contadorMonedas = 0;
    monedasInicial = 0;
    contador.innerHTML = `<h3>${contadorMonedas}</h3>`;
    vaciarFrutas();
    btnSalir.disabled = true;
  }
  
  //Funciones para mostrar ayuda
  function abrirInfo(){
    modalInfo.classList.add("is-active");
  }
  
  function cerrarInfo(){
    modalInfo.classList.remove("is-active")
  }
  
  /* Funciones del audio */
  
  // ubicación de los archivos 
  const dir = 'sounds/';
  // array global de audios
  let audios = [];
  
  // esta función precarga en el DOM los audios para poder disponer de ellos al activarlos
  precargarSonidos( 4, inicializar() );
  
  function inicializar(){
    console.log('Los audios se han cargado!');
  }
  
  function precargarSonidos(n, fncOK){
    var cargados = 0;
    for(var i=0;i<n;i++){
      var audio = new Audio(dir+(i+1)+'.wav'); 
        audio.addEventListener('canplaythrough',function(){
          cargados++;
          if( cargados >= n){
            fncOK ? fncOK() : null;
          }
        });
      audios[i]=audio;
    }
  }
  
  
  // Eventos. Listeners para los botones.
  btnJugar.addEventListener("click", jugar);
  btnMonedas.addEventListener("click", insertarMoneda);
  btnSalir.addEventListener("click", salir);
  btnInfo.addEventListener("click",abrirInfo);
  cierreInfo.addEventListener("click",cerrarInfo);
  
})();

