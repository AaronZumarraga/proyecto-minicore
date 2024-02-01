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
          <td>{{ calcularPromedio(alumnoSeleccionado.notas) }}</td>
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
      listaAlumnos: [],
      alumnoSeleccionado: null,
    };
  },
  mounted() {
    this.obtenerListaAlumnos();
  },
  methods: {
    obtenerListaAlumnos() {
      fetch('http://localhost:3000/alumnos')
        .then(response => response.json())
        .then(data => {
          this.listaAlumnos = data;
        })
        .catch(error => console.error('Error al obtener la lista de alumnos:', error));
    },
    buscar() {
      // Encontrar el alumno seleccionado por su Id_estudiante
      this.alumnoSeleccionado = this.listaAlumnos.find(alumno => alumno.Id_estudiante === this.filtroAlumno);
    },
    calcularPromedio(notas) {
      if (notas && notas.length > 0) {
        const sumaNotas = notas.reduce((total, nota) => total + nota, 0);
        return (sumaNotas / notas.length).toFixed(2);
      } else {
        return 'N/A';
      }
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
