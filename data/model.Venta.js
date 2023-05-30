const { Model, DataTypes } = require("sequelize");
const {db: sequelize} = require("./db-init");

const Venta = sequelize.define(
    "Venta",
    {}, // fields
    {} // options
);

module.exports = { Venta }