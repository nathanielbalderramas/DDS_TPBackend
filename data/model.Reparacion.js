
const { DataTypes } = require("sequelize");

module.exports = function (db) {
    const Reparacion = db.define(
        "Reparacion",
        {}, // fields
        {} // options
    );
    return Reparacion;
};
