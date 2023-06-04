const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

module.exports = function (db) {
    const EstadoVehiculo = db.define(
        "EstadoVehiculo",
        {id: {type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            },
        nombre: {type: DataTypes.STRING,
                allowNull: false,
                unique: true
                }
        }, 
        {} // options
    );
    return EstadoVehiculo;
};
