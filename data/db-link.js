require('dotenv').config({path: "../.env"});
const path = require("path")
const { touch_db } = require("./db-init");
const Sequelize = require("sequelize");

const initMarca = require("./model.Marca");
const initCliente = require("./model.Cliente");
const initVehiculo = require("./model.Vehiculo");
const initAlquiler = require("./model.Alquiler");
const initReparacion = require("./model.Reparacion");
const initVenta = require("./model.Venta");
const initEstadoVehiculo = require("./model.EstadoVehiculo");

touch_db();
const db = new Sequelize({
    dialect:  process.env.DIALECT, 
    storage: process.env.DATABASE, 
    user: process.env.USER, 
    password: process.env.PASSWORD,
    logging: false,
})

const Marca = initMarca(db);
const Cliente = initCliente(db)
const Vehiculo = initVehiculo(db);
const Alquiler = initAlquiler(db);
const Reparacion = initReparacion(db);
const Venta = initVenta(db);
const EstadoVehiculo = initEstadoVehiculo(db);

Vehiculo.hasOne(Alquiler, {foreignKey: "IdVehiculo"})
Marca.hasOne(Vehiculo, {foreignKey: "Marca"})

check_db(db)

async function check_db(db) {
    // Authentication
    try {
        await db.authenticate();
    } catch (error) {
        console.log("Authentications Failed!")
        console.error(error);
        return
    }

    // Sync
    try {
        await db.sync();
    } catch (error) {
        console.log("Sync Failed!");
        console.error(error);
        return;
    }
}(db);

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