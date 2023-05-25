const express = require("express");


// crear servidor
const app = express(); 

// utilities
app.use(express.json())

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

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});