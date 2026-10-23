const parrafoOperaciones = document.querySelector("#idParrafo");

const botonesOperaciones = {
  sumar: document.querySelector("#idBtnSumar"),
  restar: document.querySelector("#idBtnRestar"),
  multiplicar: document.querySelector("#idBtnMultiplicar"),
  dividir: document.querySelector("#idBtnDividir"),
};

Object.entries(botonesOperaciones).forEach(([operacion, boton]) => {
  boton.addEventListener("click", () => calcular(operacion));
});

function solicitarNumero(mensaje) {
  const respuesta = window.prompt(mensaje);

  if (respuesta === null) {
    return null;
  }

  const texto = respuesta.trim();
  const numero = Number(texto);

  if (texto === "" || !Number.isFinite(numero)) {
    window.alert("Ingresa un número válido.");
    return null;
  }

  return numero;
}

function calcular(operacion) {
  const simbolos = {
    sumar: "+",
    restar: "-",
    multiplicar: "×",
    dividir: "÷",
  };
  const numero1 = solicitarNumero(
    `Ingresa el primer número para ${operacion}.`,
  );

  if (numero1 === null) {
    return;
  }

  const numero2 = solicitarNumero(
    `Ingresa el segundo número para ${operacion}.`,
  );

  if (numero2 === null) {
    return;
  }

  if (operacion === "dividir" && numero2 === 0) {
    parrafoOperaciones.textContent = "No se puede dividir entre cero.";
    return;
  }

  const resultados = {
    sumar: numero1 + numero2,
    restar: numero1 - numero2,
    multiplicar: numero1 * numero2,
    dividir: numero1 / numero2,
  };
  const resultado = resultados[operacion];

  parrafoOperaciones.textContent = `${numero1} ${simbolos[operacion]} ${numero2} = ${resultado}`;
}
