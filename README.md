# Tripleten web_project_around_full
Around The U.S. — Full Stack

Aplicación web full stack desarrollada como parte del programa de Desarrollo Web de TripleTen.

El proyecto permite a los usuarios registrarse, iniciar sesión, editar su perfil, actualizar su avatar, crear y eliminar tarjetas, y dar o quitar “me gusta” a las tarjetas.

Funcionalidades

Autenticación

* Registro de nuevos usuarios.
* Inicio de sesión.
* Manejo de sesiones mediante JWT.
* Almacenamiento del token en localStorage.
* Validación del token al volver a visitar o actualizar la página.
* Rutas protegidas para usuarios autenticados.
* Cierre de sesión.
* Mensajes visuales de éxito y error mediante InfoTooltip.

Perfil de usuario

* Visualización de la información del usuario.
* Edición del nombre y descripción.
* Actualización del avatar.

Tarjetas

* Visualización de tarjetas.
* Creación de nuevas tarjetas.
* Eliminación de tarjetas.
* Sistema de “me gusta”.
* Vista ampliada de imágenes.

Tecnologías utilizadas

Frontend

* React
* TypeScript
* Vite
* React Router
* CSS
* Fetch API

Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* CORS

Autenticación y rutas

La aplicación utiliza rutas diferentes según el estado de autenticación del usuario:

* /signup — registro de usuario.
* /signin — inicio de sesión.
* / — aplicación principal protegida.

Los usuarios no autenticados son redirigidos a /signin cuando intentan acceder a la aplicación principal.

Después de iniciar sesión correctamente, el JWT se almacena en localStorage. Al volver a cargar la aplicación, el token se valida antes de determinar el estado de autenticación del usuario.

Al cerrar sesión, el token se elimina y el usuario es redirigido nuevamente a /signin.

API

El frontend se comunica con el backend para administrar:

* Información del usuario.
* Avatar.
* Tarjetas.
* Likes.
* Eliminación y creación de tarjetas.

La autenticación utiliza la API de autorización proporcionada para el proyecto de TripleTen.

Diseño

La interfaz fue implementada siguiendo los diseños proporcionados en Figma e incluye:

* Pantallas de registro e inicio de sesión.
* Estados de éxito y error.
* Header dinámico según el estado de autenticación.
* Diseño responsive.
* Popups para edición de perfil, avatar, tarjetas e información de autenticación.

Ejecución local

Frontend

Desde la carpeta client:

npm install
npm run dev

Backend

Desde la carpeta server:

npm install
npm run dev

El backend utiliza MongoDB, por lo que el servicio de MongoDB debe estar ejecutándose localmente.

Estado del proyecto

El proyecto incluye actualmente la integración frontend/backend, operaciones CRUD, persistencia de datos con MongoDB y autenticación del lado del cliente.

Los siguientes sprints continuarán ampliando la seguridad y autenticación desde el servidor.

Autor

Adriana Capriles

Proyecto desarrollado como parte del programa de Desarrollo Web de TripleTen.