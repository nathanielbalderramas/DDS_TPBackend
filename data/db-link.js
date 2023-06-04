// allows acces to enviroment variables in proces.env
require('dotenv').config({path: "../.env"});

const path = require("path")
const Sequelize = require("sequelize");

// imports model definition functions
const initMarca = require("./model.Marca");
const initCliente = require("./model.Cliente");
const initVehiculo = require("./model.Vehiculo");
const initAlquiler = require("./model.Alquiler");
const initReparacion = require("./model.Reparacion");
const initVenta = require("./model.Venta");
const initEstadoVehiculo = require("./model.EstadoVehiculo");

// creates Sequelize instance
const db = new Sequelize({
    dialect:  process.env.DIALECT, 
    storage: process.env.DATABASE, 
    user: process.env.USER, 
    password: process.env.PASSWORD,
    logging: false,
})

// sets up models
const Marca = initMarca(db);
const Cliente = initCliente(db)
const Vehiculo = initVehiculo(db);
const Alquiler = initAlquiler(db);
const Reparacion = initReparacion(db);
const Venta = initVenta(db);
const EstadoVehiculo = initEstadoVehiculo(db);

// sets up associations
Vehiculo.hasOne(Alquiler, {foreignKey: "IdVehiculo"})
Marca.hasOne(Vehiculo, {foreignKey: "Marca"})

// checks for authentication and sync errors
check_db(db)

module.exports = {
    db: db,
    Marca: Marca,
    Cliente: Cliente,
    Vehiculo: Vehiculo,
    Alquiler: Alquiler,
    Reparacion: Reparacion,
    Venta: Venta,
    EstadoVehiculo: EstadoVehiculo,
};

async function check_db(db) {
    // checks for authentication and sync errors

    // Authentication step
    try {
        await db.authenticate();
    } catch (error) {
        console.log("Authentications Failed!")
        console.error(error);
        return
    }

    // Sync step
    try {
        await db.sync();
    } catch (error) {
        console.log("Sync Failed!");
        console.error(error);
        return;
    }
}(db);