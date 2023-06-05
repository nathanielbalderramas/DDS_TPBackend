# tpbackend
Trabajo Práctico Integrador - Etapa 1

# Descripcion del repositorio
El proyecto incluye una aplicación en express que implementa una API para una consesionaria, que además de vender autos presta servicios de alquileres.

El proyecto está construido con Express, Sequelize, sqlite3, Jest, Swagger-JSdoc y swagger-ui-express

La organización del proyecto es la siguiente.

en la carpeta /data se encuentran los modelos de sequelize para las tablas a implementar y también los scripts para levantar y conectar la base de datos.

En la carpeta /controllers se encuentran las funciones para crear, buscar, modificar y eliminar elementos de las tablas utilizando los modelos de sequelize

En la carpeta /routes se encuentran los custom routers para los distintos endpoints de la API

En la carpeta /tests se encuentran los archivos de pruebas para los distintos endpoints de la API

App.js contiene la configuración de Express y server.js levanta la aplicación de express

# Consigna
## Tema: Backend

Aplicar los temas y estructuras vistas en clase para implementar un proyecto con node js, express, sequelize, sqlite y jest que cumpla las condiciones del enunciado según las estructuras propuestas.

 
## Enunciado:

Realizar un ejercicio grupal en el repositorio de Gitlab. El objetivo es implementar un conjunto de Web APIs o REST APIs, tantas como integrantes tenga el grupo, sobre recursos a elección. Para ello, pueden basarse en el modelo de la Web API o REST API Artículos que se implementó en el paso a paso que está compartido en el repositorio, la cual consume datos de la base de datos mediante el ORM Sequelize e implementa un conjunto de endpoints de acceso a estas tablas en de acuerdo con lo estudiado.
 

Para completar el ejercicio, cada grupo debe crear una tabla por alumno, con al menos 10 registros, incluyendo al menos un campo numérico, uno de fecha y otro de string. Además, deben crear el modelo de Sequelize que represente la tabla y el controlador Web API o REST API con los métodos get, getById, post, put y delete. E implementar los tests unitarios de cada endpoint.


Este ejercicio les permitirá aplicar los conocimientos adquiridos en clase y poner en práctica la implementación de Web APIs o REST APIs utilizando Sequelize. Además, les brindará la oportunidad de trabajar en equipo y mejorar su habilidad para colaborar en proyectos de programación.

 
 ## Condiciones de Entrega:

Para entregar el ejercicio cada grupo deberá: realizar el merge de los commits de todos los integrantes en la rama main del repositorio asociado al proyecto.

Además del proyecto deberá realizar un DER, diagrama de Entidad Relación de las tablas agregadas. Luego comprimir una copia del repositorio, sin incluir la carpeta node_modules, y junto con una imagen del DER generado, todo esto en un archivo que tenga por nombre:

    Grupo-3KXX-##.zip

de acuerdo con la denominación del grupo de aula virtual que les haya tocado.

Responder a esta tarea en el aula virtual de la siguiente manera:

    Subir el archivo zip indicado en donde dice subir entrega y agregar un link al repositorio en el texto de la entrega.

Una vez realizadas las acciones anteriores se considera entregado el trabajo y sobre el mismo se realizan las correcciones.