const { DataTypes } = require("sequelize");

module.exports = function (db) {
    const Venta = db.define(
        "Venta",
        {}, // fields
        {} // options
    );
    return Venta;
};
