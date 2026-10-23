const pedidos = [];

const formularioPedido = document.querySelector("#formularioPedido");
const productoInput = document.querySelector("#producto");
const precioInput = document.querySelector("#precio");
const cantidadInput = document.querySelector("#cantidad");
const cuerpoTabla = document.querySelector("#tablaPedidos");
const totalUnidades = document.querySelector("#totalUnidades");
const montoTotal = document.querySelector("#montoTotal");
const precioMaximoInput = document.querySelector("#precioMaximo");
const mensajeEstado = document.querySelector("#mensajeEstado");
const formatoMoneda = new Intl.NumberFormat("es-SV", {
  style: "currency",
  currency: "USD",
});

precioMaximoInput.addEventListener("input", () => {
  precioMaximoInput.setCustomValidity("");
});

formularioPedido.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const producto = productoInput.value.trim();
  const precio = precioInput.valueAsNumber;
  const cantidad = cantidadInput.valueAsNumber;

  if (producto === "") {
    mostrarMensaje("Escribe el nombre del producto.", true);
    productoInput.focus();
    return;
  }

  if (!Number.isFinite(precio) || precio <= 0) {
    mostrarMensaje("El precio debe ser un número mayor que cero.", true);
    precioInput.focus();
    return;
  }

  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    mostrarMensaje("La cantidad debe ser un entero positivo.", true);
    cantidadInput.focus();
    return;
  }

  pedidos.push({ producto, precio, cantidad });
  formularioPedido.reset();
  precioInput.focus();
  mostrarMensaje(`Se agregó el pedido de ${producto}.`);
  actualizarInterfaz();
});

document.querySelector("#btnFiltrar").addEventListener("click", () => {
  const precioMaximo = precioMaximoInput.valueAsNumber;

  if (
    precioMaximoInput.value.trim() === "" ||
    !Number.isFinite(precioMaximo) ||
    !precioMaximoInput.validity.valid
  ) {
    precioMaximoInput.setCustomValidity("Ingresa un precio máximo válido.");
    precioMaximoInput.reportValidity();
    return;
  }

  const pedidosFiltrados = pedidos.filter(
    (pedido) => pedido.precio <= precioMaximo,
  );
  renderizarTabla(pedidosFiltrados);
  mostrarMensaje(
    `Se muestran ${pedidosFiltrados.length} de ${pedidos.length} pedidos por precio.`,
  );
});

document.querySelector("#btnMostrarTodos").addEventListener("click", () => {
  renderizarTabla(pedidos);
  mostrarMensaje(`Se muestran todos los pedidos (${pedidos.length}).`);
});

document.querySelector("#btnLimpiar").addEventListener("click", () => {
  pedidos.length = 0;
  precioMaximoInput.value = "";
  precioMaximoInput.setCustomValidity("");
  formularioPedido.reset();
  mostrarMensaje("Se eliminaron todos los pedidos.");
  actualizarInterfaz();
});

function actualizarInterfaz() {
  renderizarTabla(pedidos);

  const resumen = pedidos.reduce(
    (totales, pedido) => ({
      unidades: totales.unidades + pedido.cantidad,
      monto: totales.monto + pedido.precio * pedido.cantidad,
    }),
    { unidades: 0, monto: 0 },
  );

  totalUnidades.textContent = String(resumen.unidades);
  montoTotal.textContent = formatoMoneda.format(resumen.monto);
}

function renderizarTabla(listaPedidos) {
  const filas = listaPedidos.map((pedido) => {
    const fila = document.createElement("tr");
    const producto = document.createElement("th");
    const precio = document.createElement("td");
    const cantidad = document.createElement("td");
    const subtotal = document.createElement("td");

    producto.scope = "row";
    producto.textContent = pedido.producto;
    precio.textContent = formatoMoneda.format(pedido.precio);
    cantidad.textContent = String(pedido.cantidad);
    subtotal.textContent = formatoMoneda.format(
      pedido.precio * pedido.cantidad,
    );
    fila.append(producto, precio, cantidad, subtotal);

    return fila;
  });

  if (filas.length === 0) {
    const filaVacia = document.createElement("tr");
    const celdaVacia = document.createElement("td");

    filaVacia.className = "empty-row";
    celdaVacia.colSpan = 4;
    celdaVacia.textContent =
      pedidos.length === 0
        ? "Aún no hay pedidos registrados."
        : "No hay pedidos que coincidan con el precio máximo.";
    filaVacia.append(celdaVacia);
    filas.push(filaVacia);
  }

  cuerpoTabla.replaceChildren(...filas);
}

function mostrarMensaje(mensaje, esError = false) {
  mensajeEstado.textContent = mensaje;
  mensajeEstado.classList.toggle("text-danger", esError);
  mensajeEstado.classList.toggle("text-success", !esError);
}

actualizarInterfaz();
