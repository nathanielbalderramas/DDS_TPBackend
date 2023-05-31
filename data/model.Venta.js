const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

const Venta = db.define(
    "Venta",
    {}, // fields
    {} // options
);

module.exports = { Venta }