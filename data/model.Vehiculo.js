const { Model, DataTypes } = require("sequelize");
const {db: sequelize} = require("./db-init");

const Vehiculo = sequelize.define(
    "Vehiculo",
    {}, // fields
    {} // options
);

export { Vehiculo }