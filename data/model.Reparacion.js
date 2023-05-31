const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

const Reparacion = db.define(
    "Reparacion",
    {}, // fields
    {} // options
);

module.exports = { Reparacion }