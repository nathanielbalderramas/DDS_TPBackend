// allows acces to enviroment variables in proces.env
require('dotenv').config({path: "./.env"});

const { db, check_db } = require("./data/db-link");
require("./data/model.aux");
require("./data/model.Alquiler");
require("./data/model.Reparacion");
require("./data/model.Vehiculo");
require("./data/model.Venta")
check_db(db);
console.log(db)

const app = require("./app");
const port = process.env.port || 4000;

server = app.listen(port);