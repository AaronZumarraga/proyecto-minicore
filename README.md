# Proyecto de Gestión de Calificaciones

Este proyecto tiene como objetivo proporcionar una plataforma para gestionar y visualizar las calificaciones de los estudiantes a lo largo de diferentes progresos académicos. La aplicación utiliza tecnologías modernas tanto en el frontend como en el backend para ofrecer una experiencia interactiva y eficiente.

## Tecnologías Utilizadas

### Frontend
- **Vue.js:** El frontend del proyecto está desarrollado utilizando Vue.js, un framework progresivo de JavaScript para construir interfaces de usuario interactivas.

### Backend
- **Express.js:** El servidor backend está construido con Express.js, un framework web para Node.js que simplifica el desarrollo de aplicaciones web y APIs.

- **MySQL:** La base de datos utiliza MySQL como sistema de gestión de bases de datos relacional para almacenar información sobre alumnos, sus calificaciones y los diferentes progresos académicos.

### Dependencias Adicionales
- **cors:** Middleware que permite el manejo de solicitudes CORS (Cross-Origin Resource Sharing).

- **body-parser:** Middleware que facilita el manejo del cuerpo de las solicitudes HTTP en el formato JSON.

## Configuración del Proyecto

### Backend
1. Asegúrate de tener Node.js y npm instalados.
2. Ejecuta `npm install` en el directorio del servidor para instalar las dependencias.
3. Configura los detalles de la base de datos en `server.js`.
4. Inicia el servidor con `node server.js`.

### Frontend
1. Asegúrate de tener Node.js y npm instalados.
2. Ejecuta `npm install` en el directorio del frontend para instalar las dependencias.
3. Configura la URL del servidor en `CalificacionesView.vue`.
4. Inicia la aplicación con `npm run serve`.

## Uso de la Aplicación
- Accede a la aplicación a través de la URL proporcionada por el servidor de desarrollo.
- Utiliza el formulario para filtrar y seleccionar un estudiante.
- Visualiza las calificaciones promedio en cada progreso y el cálculo del tercer progreso.
- Explora la aplicación para gestionar y analizar las calificaciones de los estudiantes.