const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

const Alquiler = db.define(
    "Alquiler",
    {}, // fields
    {} // options
);

module.exports = {Alquiler }