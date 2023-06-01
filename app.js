// allows acces to enviroment variables in proces.env
require('dotenv').config() 

// crear servidor
const express = require("express");
const app = express(); 

// setup SwaggerJsDoc
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

// require("./data/sqlite-init"); //Crea la Base si no Existe 


// utilities
app.use(express.json()) // allows JSON parsing capabilities
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification)); // setup swaggerUI

/*
// add router
const customRouter = require("./pathTo/customRouter");
app.use("/customRoute", customRouter);
*/

const marcasRoutes = require("./routes/router.Marcas");
app.use("/api", marcasRoutes);

const alquileresRoutes = require("./routes/router.Alquileres")
app.use("/api", alquileresRoutes)

const vehiculosRoutes = require("./routes/router.Vehiculos")
app.use("/api", vehiculosRoutes)

//...

// example api endpoint
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/", (req, res) => {
  res.send("Mensaje de prueba y bienvenida!");
});

//...
module.exports = app;


