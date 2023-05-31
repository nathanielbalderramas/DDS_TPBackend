/*
const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");
*/
module.exports = function (db) {
    const Reparacion = db.define(
        "Reparacion",
        {}, // fields
        {} // options
    );
    return Reparacion;
};
