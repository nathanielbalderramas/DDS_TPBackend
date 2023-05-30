const { Model, DataTypes } = require("sequelize");
const {db: sequelize} = require("./db-init");

const Alquiler = sequelize.define(
    "Alquiler",
    {}, // fields
    {} // options
);

export { Alquiler }