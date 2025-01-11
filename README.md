<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>


## CRUD de Usuarios

En este proyecto se realiza un CRUD básico de proyectos con datos como nombre, teléfono, correo y contraseña.
El backend está compuesto en Laravel y el frontend se utiliza React con TailwindCSS para el diseño.

Además del framework de Laravel y React, las tecnologías que se utilizan en este proyecto son las siguientes:

- PHP con una versión igual o superior a 8.2
- Composer con versión 2.8.4 o superior
- Inertia versión 2.0 o superior para manejar las conexiones entre el backend y las vistas en el frontend
- Spatie versión 6.10 o superior para manejar los roles y permisos dentro del proyecto
- Breeze con versión 2.3 o superior para manejar el registro de autenticación básica
- TailwindCSS con versión 3.2.1 o superior
- React 18.2.0 o superior
- Axios 1.7.4 o superior
- SweetAlert2 con versión 6.0 o superior
- Node y NPM con versiones 10.9.0 o superior
  
Para la base de datos se está utilizando MySQL y el servidor de Apache con XAMPP, así que previamente se tendrán que iniciar estos servicios para un correcto funcionamiento.

Dentro de la base de datos debe crearse una con el nombre de "prueba_tecnica_gd" (está marcado en el archivo .env en la variable DB_DATABASE). Puedes modificar el nombre en el archivo .env.

## Configuración y ejecución local

Una vez clonado el repositorio se debe de asegurar de estar en la ruta correcta del proyecto.

Se tendrá que abrir en consola (Recomendable en la consola de Visual Studio) y ejecutar el comando de `cd PruebaTecnicaGD` para asegurarse de entrar a la raíz del proyecto.

El primer comando para configurarlo es crear el archivo `.env`. En este archivo se encuentra uno llamado `.env.example`, se puede hacer una copia de este en la misma ruta y cambiar el nombre por `.env`. También se puede usar el comando `cp .env.example .env` en la consola.

El segundo comando que se debe ejecutar es `composer install` para instalar las dependencias que ocupa Laravel.

Se debe generar una clave para la aplicación, así que se ejecuta el comando `php artisan key:generate`.

Después se debe ejecutar el comando `php artisan migrate --seed` para poder crear las tablas en la base de datos, así como llenarlas con algunos registros de pruebas.

Seguido de esto, se debe ejecutar el comando `php artisan serve` para ejecutar el backend.

Después se debe abrir una consola nueva sin cerrar la actual. En esta terminal, instalaremos las dependencias del frontend y ejecutaremos localmente el frontend.

Si no se abre la consola en la ruta del proyecto, se deberá cambiar con el comando `cd PruebaTecnicaGD`.

Después de esto, ejecutar el comando `npm install`, esto instalará las dependencias del frontend.

Por último, se debe ejecutar el comando `npm run dev` para ejecutar el proyecto en local.

Para acceder a la aplicación en el navegador, deberemos ingresar la URL de `http://127.0.0.1:8000` o `localhost:8000`.

## Acceso al sistema

Al ingresar a la página, debemos hacer clic en el texto que dice "Login" en la parte superior derecha. Esto abrirá un formulario de inicio de sesión, donde podremos acceder al sistema con el correo "admin@examplecom" y la contraseña "password". Este usuario tiene el rol de "admin" y puede acceder al CRUD completo de usuarios.

También se puede acceder a la sección de "Register" para registrar un nuevo usuario. Este usuario tendrá el rol de "usuario" y solo podrá crear usuarios en el sistema, pero no podrá editarlos ni eliminarlos.

Una vez dentro del sistema, en el TopBar se encontrará una sección llamada "Usuarios", donde se puede hacer clic y ver la lista de usuarios con sus respectivas acciones.
