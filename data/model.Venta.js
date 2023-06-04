const { DataTypes } = require("sequelize");

module.exports = function (db) {
    const Venta = db.define(
        "Venta",
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Vehiculo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Vehículo es requerido",
                    }
                }
            },
            Fecha: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Fecha es requerido",
                    },
                },
            },
            Cliente: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Cliente es requerido",
                    }
                }
            },
            Estado: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Estado es requerido",
                    }
                }
            },

        }, // fields
        {} // options
    );
    return Venta;
};
