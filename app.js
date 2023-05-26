// allows acces to enviroment variables in proces.env
require('dotenv').config() 

// crear servidor
const express = require("express");
const app = express(); 

// utilities
app.use(express.json()) // allows JSON parsing capabilities

/*
// add router
const customRouter = require("./pathTo/customRouter");
app.use("/customRoute", customRouter);
*/

//...
// example api endpoint
app.get("/", (req, res) => {
  res.send("Mensaje de prueba y bienvenida!");
});
//...

module.exports = app;