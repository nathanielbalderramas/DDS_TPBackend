const { DataTypes } = require("sequelize");
/*
const {db} = require("./db-link");
const { Alquiler } = require("./model.Alquiler");
*/

module.exports = function (db) {
    const Vehiculo = db.define(
        "Vehiculo",
        {
        IdVehiculo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        }, // fields
        {} // options
    );
    return Vehiculo;
};
