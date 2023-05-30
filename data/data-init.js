const {db} = require("./db-init");
const {Alquiler} = require("./model.Alquiler");
const {Reparacion} = require("./model.Reparacion");
const {Venta} = require("./model.Venta");
const {Vehiculo} = require("./model.Vehiculo");
const {Marca, Estado, Proovedor, Cliente} = require("./model.aux");

async function populate_db() {
    // Authentication
    try {
        await db.authenticate();
        console.log("Authentications succesfull!")
    } catch (error) {
        console.log("Authentications Failed!")
        console.error(error);
        return
    }

    // Sync
    try {
        await db.sync();
        console.log("Sync succesfull!");
    } catch (error) {
        console.log("Sync Failed!");
        console.error(error);
        return;
    }
};

module.exports = { populate_db };