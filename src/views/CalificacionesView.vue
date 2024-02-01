<template>
  <div>
    <h1>Calificaciones Alumnos</h1>

    <form>
      <label for="filtroAlumno">Filtro Alumno:</label>
      <select v-model="filtroAlumno" id="filtroAlumno" name="filtroAlumno">
        <option v-for="alumno in alumnos" :key="alumno.id" :value="alumno.id">
          {{ alumno.nombre }}
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
        <tr v-for="alumno in alumnos" :key="alumno.id">
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.progreso1 }}</td>
          <td>{{ alumno.progreso2 }}</td>
          <td>{{ alumno.progreso3 }}</td>
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
      alumnos: [
        { id: 1, nombre: 'Nombre del Alumno 1', progreso1: 'Nota Progreso 1', progreso2: 'Nota Progreso 2', progreso3: 'Nota Progreso 3' },
        { id: 2, nombre: 'Nombre del Alumno 2', progreso1: 'Nota Progreso 1', progreso2: 'Nota Progreso 2', progreso3: 'Nota Progreso 3' }
        // Agrega más alumnos según sea necesario
      ]
    };
  },
  methods: {
    buscar() {
      // Aquí puedes agregar lógica de búsqueda según los filtros seleccionados
      alert('Búsqueda realizada'); // Puedes reemplazar esto con la lógica real
    }
  }
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
