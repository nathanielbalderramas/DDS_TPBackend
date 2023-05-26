// allows acces to enviroment variables in proces.env
require('dotenv').config() 

const app = rquire("./app");
const port = process.env.port || 4000;

server = app.listen(port).catch((err) => {
    console.log(err);
});