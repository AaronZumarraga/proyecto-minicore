const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'aaron',
    database: 'calificaciones',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

app.get('/alumnos', (req, res) => {
    connection.query('SELECT * FROM alumnos', (error, results) => {
        if (error) {
            console.error('Error al obtener la lista de alumnos:', error);
            res.status(500).json({ error: 'Error al obtener la lista de alumnos' });
        } else {
            res.json(results);
        }
    });
});

app.get('/notas/progreso1/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    const fechaInicio = req.query.fechaInicio || '1970-01-01';
    const fechaFin = req.query.fechaFin || '9999-12-31';

    connection.query(
        'SELECT Nota FROM notas WHERE Id_estudiante = ? AND Fecha BETWEEN ? AND ? AND Id_nota IN (SELECT Id_nota FROM progreso1 WHERE Id_estudiante = ?)',
        [idEstudiante, fechaInicio, fechaFin, idEstudiante],
        (error, results) => {
            if (error) {
                console.error('Error al obtener las notas del primer progreso:', error);
                res.status(500).json({ error: 'Error al obtener las notas del primer progreso' });
            } else {
                res.json(results);
            }
        }
    );
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
