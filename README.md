# Proyecto Docker Compose

¡Bienvenido a nuestro proyecto Docker Compose! Este repositorio contiene la configuración para una aplicación Docker multi-contenedor que consta de un frontend, un backend y una base de datos MySQL.

## 📜 Tabla de Contenidos
- [Introducción](#introducción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Servicios](#servicios)
  - [client-frontend](#client-frontend)
  - [server-backend](#server-backend)
  - [crud-task-db](#crud-task-db)
- [Primeros Pasos](#primeros-pasos)
- [Archivo `docker-compose.yml` de Ejemplo](#archivo-docker-composeyml-de-ejemplo)
- [Beneficios de Docker Compose](#beneficios-de-docker-compose)
- [Conclusión](#conclusión)

## 📝 Introducción
Este proyecto demuestra cómo usar Docker Compose para orquestar una aplicación multi-contenedor con un frontend, un backend y una base de datos. Docker Compose simplifica el proceso de configuración y despliegue, asegurando la consistencia entre los entornos de desarrollo y producción.

## 🗂️ Estructura del Proyecto
```plaintext
.
├── client-frontend  # Directorio del frontend
│   ├── Dockerfile   # Dockerfile para construir la imagen del frontend
│   ├── src          # Código fuente del frontend
│   └── ...
├── server-backend  # Directorio del backend
│   ├── Dockerfile   # Dockerfile para construir la imagen del backend
│   ├── app          # Código fuente del backend
│   └── ...
├── mysql-microservice # Directorio para la base de datos (MySQL)
│   ├── Dockerfile     # Dockerfile para la base de datos
│   └── ...
└── docker-compose.yml # Archivo principal de configuración de Docker Compose

## 🛠️ Servicios

### `client-frontend`

El servicio `client-frontend` es el responsable de la parte frontal (frontend) de la aplicación.  Utiliza un framework de frontend moderno como React, Vue.js, Angular, o similar, para proporcionar la interfaz de usuario con la que interactúan los usuarios.

*   **Dockerfile:**  Dentro del directorio `client-frontend`, hay un archivo `Dockerfile` que contiene las instrucciones para construir la imagen Docker del frontend.  Esto incluye la selección de una imagen base (normalmente Node.js), la copia del código fuente, la instalación de dependencias (usando `npm`, `yarn`, etc.) y la configuración del comando de inicio.
*   **Puertos:** El servicio expone el puerto `3000`.  Esto significa que, una vez que el contenedor esté en ejecución, podrás acceder a la aplicación frontend en tu navegador web a través de la dirección `http://localhost:3000`.
* **Volumenes**: Habitualmente se definen volumenes con el fin de acelerar el desarrollo y realizar *hot-reloading*.

### `server-backend`

El servicio `server-backend` maneja la lógica de negocio de la aplicación y proporciona los *endpoints* de la API (Application Programming Interface) a los que el frontend se conecta para obtener y enviar datos.  Este servicio suele estar construido con un framework de backend como Node.js (Express), Python (Django, Flask), Ruby on Rails, Java (Spring), etc.

*   **Dockerfile:**  Similar al frontend, el directorio `server-backend` contiene un `Dockerfile` para construir la imagen Docker del backend. Este `Dockerfile` especificará la imagen base (por ejemplo, una imagen de Python o Node.js), copiará el código del backend, instalará las dependencias (usando `pip`, `npm`, etc.) y configurará el comando para iniciar el servidor.
*   **Puertos:** El servicio expone el puerto `8000`. El frontend (u otros clientes) se comunicarán con la API del backend a través de `http://localhost:8000` (en desarrollo) o a través del nombre del servicio (`server-backend`) dentro de la red de Docker Compose.
*   **Variables de entorno:**  El backend suele necesitar variables de entorno para configuraciones como la conexión a la base de datos (URL, usuario, contraseña), claves de API, y otros ajustes que no deben estar codificados directamente en el código.

### `crud-task-db`

El servicio `crud-task-db` representa la base de datos MySQL que almacena los datos persistentes de la aplicación.

*   **Imagen:** Utiliza la imagen oficial de `mysql` de Docker Hub.  Se especifica una versión concreta (por ejemplo, `mysql:8.0` o `mysql:5.7`) para garantizar la reproducibilidad.
*   **Puertos:**  Expone el puerto `3308` al host.  **¡Importante!**  *Normalmente, no deberías exponer el puerto de la base de datos directamente al host.* Esto solo debería hacerse en entornos de desarrollo *y con precaución*. En producción (e incluso en pruebas), el backend debe conectarse a la base de datos a través de la *red interna de Docker Compose*, usando el nombre del servicio (`crud-task-db`) como hostname, *sin exponer el puerto*.
*   **Variables de entorno:**  Se utilizan variables de entorno para configurar la base de datos:
    *   `MYSQL_ROOT_PASSWORD`:  La contraseña del usuario `root` de MySQL.  *Nunca* codifiques contraseñas directamente en el archivo `docker-compose.yml`; usa variables de entorno o secretos de Docker.
    *   `MYSQL_DATABASE`: El nombre de la base de datos que se creará al iniciar el contenedor.
    *   `MYSQL_USER`:  Un usuario de MySQL (distinto de `root`) para que el backend use para conectarse.
    *   `MYSQL_PASSWORD`: La contraseña para el usuario anterior.
* **Volumenes:** Es habitual definir un volumen para persistir los datos, incluso si se eliminan y se recrean los contenedores.

## 🏁 Primeros Pasos

1.  **Clona el Repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/docker-compose-project.git
    cd docker-compose-project
    ```
    *Recuerda cambiar la `URL` por la correcta*

2.  **Construye y Ejecuta los Servicios:**

    ```bash
    docker-compose up --build
    ```

    *   `docker-compose up`: Inicia todos los servicios definidos en el archivo `docker-compose.yml`.
    *   `--build`:  Esta opción le dice a Docker Compose que *construya* (o reconstruya) las imágenes de los servicios *antes* de iniciarlos.  Esto es necesario si has realizado cambios en los `Dockerfile`s o en el código fuente de los servicios. Si no has hecho cambios en el código ni en los Dockerfiles, puedes omitir `--build` para un inicio más rápido.
    * Si se quiere iniciar en segundo plano: `docker-compose up -d --build`

3.  **Accede a los Servicios:**

    *   **Frontend:**  Abre tu navegador web y ve a `http://localhost:3000`.
    *   **Backend:**  Puedes acceder a los endpoints de la API del backend en `http://localhost:8000` (esto se usaría principalmente desde el frontend o para pruebas).

He mejorado el formato y he añadido algunas explicaciones y advertencias importantes, especialmente en lo que respecta a la exposición de la base de datos. He separado los elementos de cada servicio con viñetas para una mejor legibilidad, y explicado la función de los Dockerfiles en cada servicio. También he añadido una breve descripción de los volúmenes. He remarcado la diferencia del puerto de la Base de Datos en los distintos entornos.

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

*   **Docker:** [Instalar Docker](https://docs.docker.com/get-docker/)
*   **Docker Compose:** [Instalar Docker Compose](https://docs.docker.com/compose/install/)

Puedes verificar que tienes Docker y Docker Compose instalados ejecutando los siguientes comandos en tu terminal:

```bash
docker --version
docker-compose --version

 ##  🤝 Contribuciones

 ¡Las contribuciones son bienvenidas!  Si quieres contribuir a este proyecto, por favor sigue estos pasos:

 1.  Haz un *fork* de este repositorio.
 2.  Crea una nueva rama para tu funcionalidad o corrección de errores:  `git checkout -b mi-nueva-funcionalidad`.
 3.  Realiza tus cambios y haz *commit*: `git commit -m "Añade mi funcionalidad"`.
 4.  Envía tus cambios a tu repositorio: `git push origin mi-nueva-funcionalidad`.
 5.  Crea un *pull request* desde tu rama a la rama principal de este repositorio.
     Si encuentras errores, o mejoras: Crea un *issue*