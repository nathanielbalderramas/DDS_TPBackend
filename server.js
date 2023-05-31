// allows acces to enviroment variables in proces.env
require('dotenv').config({path: "./.env"});

const { db, check_db } = require("./data/db-link");
check_db(db);
console.log(db.models)

const app = require("./app");
const port = process.env.port || 4000;

server = app.listen(port);