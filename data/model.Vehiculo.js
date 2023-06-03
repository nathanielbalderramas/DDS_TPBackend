const { DataTypes } = require("sequelize");

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
