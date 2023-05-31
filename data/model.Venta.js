/*
const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");
*/

module.exports = function (db) {
    const Venta = db.define(
        "Venta",
        {}, // fields
        {} // options
    );
    return Venta;
};
