// allows acces to enviroment variables in proces.env
require('dotenv').config({path: "./.env"});

const db  = require("./data/db-link");
/*
require("./data/model.aux");
require("./data/model.Alquiler");
require("./data/model.Reparacion");
require("./data/model.Vehiculo");
require("./data/model.Venta")
check_db(db);
*/

const app = require("./app");
const port = process.env.port || 4000;

app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
