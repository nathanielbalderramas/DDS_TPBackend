const { Model, DataTypes } = require("sequelize");
const {db: sequelize} = require("./db-init");

const Reparacion = sequelize.define(
    "Reparacion",
    {}, // fields
    {} // options
);

export { Reparacion }