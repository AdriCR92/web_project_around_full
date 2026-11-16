Around The U.S. — Full Stack

Aplicación web full stack desarrollada como parte del programa de Desarrollo Web de TripleTen.

El proyecto permite a los usuarios registrarse, iniciar sesión, editar su perfil, actualizar su avatar, crear y eliminar tarjetas, y dar o quitar «me gusta» a las tarjetas.

🌐 Despliegue

La aplicación está desplegada en Vercel y utiliza MongoDB Atlas como base de datos en la nube.

* Frontend: https://web-project-around-full-three.vercel.app/
* Backend (API REST): https://around-backend-nine.vercel.app/

✨ Funcionalidades

Autenticación

* Registro de nuevos usuarios.
* Inicio de sesión.
* Autenticación mediante JWT.
* Almacenamiento del token en localStorage.
* Validación del token al volver a visitar o actualizar la página.
* Rutas protegidas para usuarios autenticados.
* Cierre de sesión.
* Mensajes visuales de éxito y error mediante InfoTooltip.

Perfil de usuario

* Visualización de la información del usuario.
* Edición del nombre y descripción.
* Actualización del avatar.
* Persistencia de los cambios en MongoDB.

Tarjetas

* Visualización de tarjetas.
* Creación de nuevas tarjetas.
* Eliminación de tarjetas propias.
* Sistema de «me gusta».
* Vista ampliada de imágenes.
* Persistencia de tarjetas y likes en MongoDB.

🛠️ Tecnologías utilizadas

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
* MongoDB Atlas
* Mongoose
* JWT
* CORS

Despliegue

* Vercel — frontend y backend.
* MongoDB Atlas — base de datos en la nube.

🔐 Autenticación y rutas

La aplicación utiliza rutas diferentes según el estado de autenticación del usuario:

* /signup — registro de usuario.
* /signin — inicio de sesión.
* / — aplicación principal protegida.

Los usuarios no autenticados son redirigidos a /signin cuando intentan acceder a la aplicación principal.

Después de iniciar sesión correctamente, el JWT se almacena en localStorage. Al volver a cargar la aplicación, el token se valida antes de determinar el estado de autenticación del usuario.

Al cerrar sesión, el token se elimina y el usuario es redirigido nuevamente a /signin.

🔗 API REST

El frontend se comunica con un backend propio desarrollado con Express y TypeScript.

La API permite administrar:

* Registro e inicio de sesión.
* Autenticación de usuarios mediante JWT.
* Información del perfil.
* Actualización del avatar.
* Creación y eliminación de tarjetas.
* Likes de las tarjetas.

La información se almacena en MongoDB mediante Mongoose.

En producción, la aplicación utiliza MongoDB Atlas.

🎨 Diseño

La interfaz fue implementada siguiendo los diseños proporcionados en Figma e incluye:

* Pantallas de registro e inicio de sesión.
* Estados de éxito y error.
* Header dinámico según el estado de autenticación.
* Diseño responsive.
* Popups para edición de perfil, avatar, tarjetas e información de autenticación.

💻 Ejecución local

Frontend

Desde la carpeta client:

npm install
npm run dev

Backend

Desde la carpeta server:

npm install
npm run dev

Para ejecutar el backend localmente, es necesario configurar las variables de entorno correspondientes y disponer de una conexión a MongoDB.

Las credenciales y variables sensibles deben mantenerse fuera del repositorio.

📌 Estado del proyecto

El proyecto cuenta con integración frontend/backend, operaciones CRUD, autenticación mediante JWT y persistencia de datos con MongoDB.

El frontend y el backend están desplegados en Vercel y conectados a una base de datos MongoDB Atlas.

👩‍💻 Autor

Adriana Capriles

Proyecto desarrollado como parte del programa de Desarrollo Web de TripleTen.