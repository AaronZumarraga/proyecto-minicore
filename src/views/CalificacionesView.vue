<template>
  <div>
    <h1>Calificaciones Alumnos</h1>

    <form>
      <label for="filtroAlumno">Filtro Alumno:</label>
      <select v-model="filtroAlumno" id="filtroAlumno" name="filtroAlumno">
        <option v-for="alumno in listaAlumnos" :key="alumno.Id_estudiante" :value="alumno.Id_estudiante">
          {{ alumno.Nombre }}
        </option>
      </select>

      <label for="fechaInicio">Fecha Inicio:</label>
      <input type="date" v-model="fechaInicio" id="fechaInicio" name="fechaInicio">

      <label for="fechaFin">Fecha Fin:</label>
      <input type="date" v-model="fechaFin" id="fechaFin" name="fechaFin">

      <button type="button" @click="buscar">Buscar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Progreso 1</th>
          <th>Progreso 2</th>
          <th>Progreso 3</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="alumnoSeleccionado">
          <td>{{ alumnoSeleccionado.Nombre }}</td>
          <td>{{ alumnoSeleccionado.progreso1 }}</td>
          <td>{{ alumnoSeleccionado.progreso2 }}</td>
          <td>{{ alumnoSeleccionado.progreso3 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtroAlumno: null,
      fechaInicio: null,
      fechaFin: null,
      listaAlumnos: [], // Nueva propiedad para almacenar la lista de alumnos
      alumnoSeleccionado: null, // Nueva propiedad para almacenar el alumno seleccionado
    };
  },
  mounted() {
    this.obtenerListaAlumnos(); // Llama a la función al cargar el componente
  },
  methods: {
    obtenerListaAlumnos() {
      fetch('http://localhost:3000/alumnos') // Reemplaza la URL con la correcta
        .then(response => response.json())
        .then(data => {
          this.listaAlumnos = data;
        })
        .catch(error => console.error('Error al obtener la lista de alumnos:', error));
    },
    
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 10px;
  text-align: left;
}

form {
  margin-bottom: 20px;
}
</style>
