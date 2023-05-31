const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

const Vehiculo = db.define(
    "Vehiculo",
    {}, // fields
    {} // options
);

module.exports = { Vehiculo }