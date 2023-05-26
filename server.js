// allows acces to enviroment variables in proces.env
require('dotenv').config() 

const app = require("./app");
const port = process.env.port || 4000;

server = app.listen(port);