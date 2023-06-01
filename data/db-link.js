require('dotenv').config({path: "../.env"});
const path = require("path")
const { touch_db } = require("./db-init");
const Sequelize = require("sequelize");

const initMarca = require("./model.Marca");

const initVehiculo = require("./model.Vehiculo");
const initAlquiler = require("./model.Alquiler");
const initReparacion = require("./model.Reparacion")
const initVenta = require("./model.Venta")

touch_db();
const db = new Sequelize({
    dialect:  process.env.DIALECT, 
    storage: process.env.DATABASE, 
    user: process.env.USER, 
    password: process.env.PASSWORD,
    logging: false,
})

const Marca = initMarca(db);
const Vehiculo = initVehiculo(db);
const Alquiler = initAlquiler(db);
const Reparacion = initReparacion(db);
const Venta = initVenta(db);

Vehiculo.hasOne(Alquiler, {foreignKey: "IdVehiculo"})

check_db(db)

async function check_db(db) {
    // Authentication
    try {
        await db.authenticate();
        // console.log("Authentications succesfull!")
    } catch (error) {
        console.log("Authentications Failed!")
        console.error(error);
        return
    }

    // Sync
    try {
        await db.sync();
        // console.log("Sync succesfull!");
    } catch (error) {
        console.log("Sync Failed!");
        console.error(error);
        return;
    }
}(db);

module.exports = {
    db: db,
    Marca: Marca,
    Vehiculo: Vehiculo,
    Alquiler: Alquiler,
    Reparacion: Reparacion,
    Venta: Venta,
};