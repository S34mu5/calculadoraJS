// ======== PASO 1: CONECTAR CON LOS ELEMENTOS HTML ========
// Buscar la pantalla y los botones especiales en la página# nombre, optativa, total

const pantalla = document.getElementById("pantalla");
const btnClear = document.getElementById("btnClear");
const btnIgual = document.getElementById("btnIgual");

// Buscar los botones de números (0-9)
const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");

// Buscar los botones de operaciones (+, -, *, /, .)
const operadorSumar = document.getElementById("operadorSumar");
const operadorRestar = document.getElementById("operadorRestar");
const operadorMultiplicar = document.getElementById("operadorMultiplicar");
const operadorDividir = document.getElementById("operadorDividir");
const operadorDecimal = document.getElementById("operadorDecimal");

// Crear elemento de audio para reproducir sonido al dividir por cero
const sonidoError = new Audio();
sonidoError.src = "audio/mixkit-little-cat-pain-meow-87.wav"; // Sonido de gato sufriendo
sonidoError.preload = "auto";

// Al iniciar, mostrar "0" en la pantalla

pantalla.value = "0";

// ======== PASO 2: GUARDAR LOS DATOS DE LA OPERACIÓN ========
// Estas variables guardan la información mientras usamos la calculadora
let numeroActual = ""; // El número que estamos escribiendo ahora
let numeroAnterior = ""; // El primer número de la operación
let operacion = null; // Qué operación vamos a hacer (+, -, *, /)
let resetearPantalla = false; // Si debemos borrar la pantalla al pulsar un número

// ======== PASO 3: FUNCIONES PRINCIPALES ========
// Esta función hace el cálculo cuando pulsamos "="
function calcular() {
  // Convertir lo que está en pantalla (que son letras) a números reales
  let resultado;
  const anterior = parseFloat(numeroAnterior); // Convierte el primer número
  const actual = parseFloat(numeroActual); // Convierte el segundo número

  // Si falta algún número, no hacemos nada
  if (isNaN(anterior) || isNaN(actual)) return;

  // Hacer el cálculo según el operador que elegimos
  switch (operacion) {
    case "+": // Si es suma
      resultado = anterior + actual;
      break;
    case "-": // Si es resta
      resultado = anterior - actual;
      break;
    case "*": // Si es multiplicación
      resultado = anterior * actual;
      break;
    case "/": // Si es división
      // No podemos dividir entre cero
      if (actual === 0) {
        resultado = "Hiciste llorar a Hello Kitty"; // Mostrar error
        sonidoError.play(); // Reproducir sonido de gato muriendo
      } else {
        resultado = anterior / actual;
      }
      break;
    default:
      return; // Si no hay operación, no hacemos nada
  }

  // Mostrar el resultado en la pantalla
  pantalla.value = resultado;
  numeroActual = resultado.toString(); // Guardar resultado como texto
  operacion = null; // Ya no hay operación pendiente
}

// Esta función borra todo (botón C)
function borrarPantalla() {
  // Volver a empezar desde cero
  pantalla.value = "0"; // Mostrar 0 en pantalla
  numeroActual = ""; // Borrar el número actual
  numeroAnterior = ""; // Borrar el número anterior
  operacion = null; // Borrar la operación
  resetearPantalla = false; // No resetear la pantalla
}

// Esta función añade un número a la pantalla
function agregarNumero(numero) {
  // Si acabamos de pulsar un operador, limpiar la pantalla
  if (resetearPantalla) {
    pantalla.value = ""; // Vaciar la pantalla
    resetearPantalla = false;
  }

  // Si solo hay un "0", reemplazarlo con el número nuevo
  if (pantalla.value === "0") {
    pantalla.value = numero;
  } else {
    // Si no, añadir el número al final de lo que ya hay
    pantalla.value += numero;
  }

  // Guardar lo que hay en pantalla
  numeroActual = pantalla.value;
}

// Esta función guarda la operación que queremos hacer (+, -, *, /)
function manejarOperador(op) {
  // Si ya tenemos una operación pendiente, calcularla primero
  if (operacion !== null && numeroActual !== "") {
    calcular();
  }

  // Guardar el número que hay en pantalla como primer número
  numeroAnterior = pantalla.value;
  // Guardar qué operación vamos a hacer
  operacion = op;
  // Indicar que la pantalla debe limpiarse con el próximo número
  resetearPantalla = true;
}

// ======== PASO 4: CONFIGURAR LOS BOTONES ========
// Hacer que los botones de números funcionen cuando los pulsamos
btn0.addEventListener("click", () => agregarNumero("0"));
btn1.addEventListener("click", () => agregarNumero("1"));
btn2.addEventListener("click", () => agregarNumero("2"));
btn3.addEventListener("click", () => agregarNumero("3"));
btn4.addEventListener("click", () => agregarNumero("4"));
btn5.addEventListener("click", () => agregarNumero("5"));
btn6.addEventListener("click", () => agregarNumero("6"));
btn7.addEventListener("click", () => agregarNumero("7"));
btn8.addEventListener("click", () => agregarNumero("8"));
btn9.addEventListener("click", () => agregarNumero("9"));

// Hacer que los botones de operaciones funcionen
operadorSumar.addEventListener("click", () => manejarOperador("+"));
operadorRestar.addEventListener("click", () => manejarOperador("-"));
operadorMultiplicar.addEventListener("click", () => manejarOperador("*"));
operadorDividir.addEventListener("click", () => manejarOperador("/"));

// Hacer que el botón decimal añada un punto (solo si no hay otro punto)
operadorDecimal.addEventListener("click", () => {
  // Si ya hay un punto, no hacer nada
  if (!pantalla.value.includes(".")) {
    pantalla.value += "."; // Añadir un punto
    numeroActual = pantalla.value;
  }
});

// Hacer que el botón igual (=) calcule el resultado
btnIgual.addEventListener("click", () => {
  calcular(); // Hacer la operación
  resetearPantalla = true; // Preparar para un nuevo cálculo
});

// Hacer que el botón C borre todo
btnClear.addEventListener("click", () => borrarPantalla());
