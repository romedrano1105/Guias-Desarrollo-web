const alumnos = [
  {
    id: 1,
    nombre: "Marcos Antonio",
    apellido: "Alas",
    correo: "marcos.alas@estudiante.esen.edu.sv",
  },
  {
    id: 2,
    nombre: "Ana Paola",
    apellido: "Rivas Polanco",
    correo: "paola.rivas@estudiante.esen.edu.sv",
  },
  {
    id: 3,
    nombre: "Alexis Armando",
    apellido: "Quintanilla Peña",
    correo: "alexis.quintanilla@estudiante.esen.edu.sv",
  },
  {
    id: 4,
    nombre: "Vanessa Alejandra",
    apellido: "Bermudez Urquilla",
    correo: "vanessa.bermudez@estudiante.esen.edu.sv",
  },
  {
    id: 5,
    nombre: "Oscar Armando",
    apellido: "López Rodriguez",
    correo: "oscar.lopez@estudiante.esen.edu.sv",
  },
];

const filas = alumnos
  .map(
    (alumno) => `
      <tr>
        <td scope="row">${alumno.id}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.correo}</td>
      </tr>`,
  )
  .join("");

document.querySelector("#idContenedor").innerHTML = `
  <table>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Correo electrónico</th>
      </tr>
    </thead>
    <tbody>${filas}</tbody>
  </table>`;
