const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 0;

const parrafoNumero = document.querySelector("#idParrafo");
const botonAdivinar = document.querySelector("#idBtnNumero");

botonAdivinar.addEventListener("click", adivinarNumero);

function adivinarNumero() {
  if (intentos >= numeroIntentos) {
    return;
  }

  const respuesta = window.prompt(
    `¿Qué número se ha generado? (Intento ${intentos + 1} de ${numeroIntentos})`,
  );

  if (respuesta === null) {
    parrafoNumero.textContent = "Juego cancelado. Puedes volver a intentarlo.";
    return;
  }

  const numero = Number(respuesta);

  if (!Number.isInteger(numero) || numero < 1 || numero > 25) {
    parrafoNumero.textContent =
      "Ingresa un número entero entre 1 y 25. Este intento no cuenta.";
    return;
  }

  intentos += 1;

  if (numero === numeroAleatorio) {
    parrafoNumero.textContent = `¡Correcto! Adivinaste el número ${numeroAleatorio} en ${intentos} intento(s).`;
    terminarJuego();
    return;
  }

  const pista =
    numeroAleatorio > numero
      ? "El número que buscas es más alto."
      : "El número que buscas es más bajo.";

  if (intentos === numeroIntentos) {
    parrafoNumero.textContent = `Se terminaron tus intentos. ${pista} El número oculto era ${numeroAleatorio}.`;
    terminarJuego();
    return;
  }

  parrafoNumero.textContent = `${pista} Te quedan ${numeroIntentos - intentos} intento(s).`;
}

function terminarJuego() {
  botonAdivinar.disabled = true;
  botonAdivinar.textContent = "Juego terminado";
}
