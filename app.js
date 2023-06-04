// creates express app
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
  apis: ['./routes/*.js'], // files containing swagger annotations
};
const openapiSpecification = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// Initializes database with mock data if needed
require("./data/sqlite-init"); 

// allows JSON parsing capabilities
app.use(express.json()) 


// adds routers
const marcasRoutes = require("./routes/router.Marcas");
app.use("/api", marcasRoutes);

const alquileresRoutes = require("./routes/router.Alquileres")
app.use("/api", alquileresRoutes)

const vehiculosRoutes = require("./routes/router.Vehiculos")
app.use("/api", vehiculosRoutes);

const ventasRoutes = require("./routes/router.Ventas")
app.use("/api", ventasRoutes);

const clientesRoutes = require("./routes/router.Clientes")
app.use("/api", clientesRoutes);

// sets up a mock home response
app.get("/", (req, res) => {
  res.send("Mensaje de prueba y bienvenida!");
});

// exports app for server and tests
module.exports = app;


