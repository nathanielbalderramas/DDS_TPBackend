// allows acces to enviroment variables in proces.env
require('dotenv').config({path: "./.env"});

// imports app and sets up port
const app = require("./app");
const port = process.env.port || 4000;

// runs server
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
