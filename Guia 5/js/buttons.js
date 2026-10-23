const parrafo = document.querySelector("#idParrafo");

document.querySelector("#idBtnAlert").addEventListener("click", aviso);
document.querySelector("#idBtnPrompt").addEventListener("click", capturarDatos);
document.querySelector("#idBtnConfirm").addEventListener("click", confirmacion);
document.querySelector("#idBtnParrafo").addEventListener("click", dibujarParrafo);

function aviso() {
  window.alert("Bienvenido al mundo JavaScript");
}

function confirmacion() {
  const respuesta = window.confirm("¿Desea salir de la sesión?");
  window.alert(`Valor seleccionado ${respuesta}`);
}

function capturarDatos() {
  const nombre = window.prompt("¿Cuál es su nombre?");

  if (nombre === null) {
    return;
  }

  const edad = window.prompt("¿Cuál es su edad?", "0");

  if (edad !== null) {
    window.alert(`Su nombre es ${nombre} y su edad ${edad}`);
  }
}

function dibujarParrafo() {
  const contenido = window.prompt(
    "Escribe la información que deseas visualizar en el párrafo",
  );

  if (contenido !== null) {
    parrafo.textContent = contenido;
  }
}
