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
          <td>{{ promedioProgreso1 }}</td>
          <td>{{ promedioProgreso2 }}</td>
          <td>{{ calcularProgreso3() }}</td>
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
      promedioProgreso1: 'N/A', // Inicializar con 'N/A'
      promedioProgreso2: 'N/A', // Inicializar con 'N/A'
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
      this.calcularPromedioProgreso1(this.alumnoSeleccionado.Id_estudiante);
      this.calcularPromedioProgreso2(this.alumnoSeleccionado.Id_estudiante); // Agregado
      this.calcularProgreso3();
    },
    calcularPromedioProgreso1(idEstudiante) {
      const fechaInicio = '2023-10-05';
      const fechaFin = '2023-11-25';

      // Hacer una nueva solicitud al servidor para obtener las notas del primer progreso
      fetch(`http://localhost:3000/notas/progreso1/${idEstudiante}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        .then(response => response.json())
        .then(notas => {
          if (notas && notas.length > 0) {
            const sumaNotas = notas.reduce((total, nota) => total + nota.Nota, 0);
            this.promedioProgreso1 = (sumaNotas / notas.length).toFixed(2);
          } else {
            this.promedioProgreso1 = 'N/A';
          }
        })
        .catch(error => {
          console.error('Error al obtener las notas del primer progreso:', error);
          this.promedioProgreso1 = 'N/A';
        });
    },
    calcularPromedioProgreso2(idEstudiante) {
      const fechaInicio = '2023-11-30';
      const fechaFin = '2024-01-06';

      // Hacer una nueva solicitud al servidor para obtener las notas del segundo progreso
      fetch(`http://localhost:3000/notas/progreso2/${idEstudiante}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        .then(response => response.json())
        .then(notas => {
          if (notas && notas.length > 0) {
            const sumaNotas = notas.reduce((total, nota) => total + nota.Nota, 0);
            this.promedioProgreso2 = (sumaNotas / notas.length).toFixed(2);
          } else {
            this.promedioProgreso2 = 'N/A';
          }
        })
        .catch(error => {
          console.error('Error al obtener las notas del segundo progreso:', error);
          this.promedioProgreso2 = 'N/A';
        });
    },
    calcularProgreso3() {
      if (this.promedioProgreso1 !== 'N/A' && this.promedioProgreso2 !== 'N/A') {
        // Calcular el valor del progreso 3 según la fórmula corregida
        const valorProgreso1 = parseFloat(this.promedioProgreso1);
        const valorProgreso2 = parseFloat(this.promedioProgreso2);

        // Utilizar la fórmula ajustada
        const valorProgreso3 = (((60 - ((valorProgreso1 * 25) / 10) - ((valorProgreso2 * 35) / 10))) * 10) / 40;

        // Asegurarse de que el valor esté dentro del rango [0, 10] y redondearlo a 2 decimales
        return parseFloat(Math.min(Math.max(valorProgreso3, 0), 10).toFixed(2));
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

table,
th,
td {
  border: 1px solid black;
}

th,
td {
  padding: 10px;
  text-align: left;
}

form {
  margin-bottom: 20px;
}
</style>
