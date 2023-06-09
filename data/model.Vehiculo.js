const { DataTypes } = require("sequelize");

module.exports = function (db) {
    const Vehiculo = db.define(
        "Vehiculo",
        {
            IdVehiculo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Marca: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Marca es requerido",
                    }
                }
            },
            Modelo: {
                type: DataTypes.STRING(60),
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Modelo es requerido",
                    },
                    len: {
                        args: [3, 60],
                        msg: "Modelo debe ser tipo carateres, entre 3 y 60 de longitud",
                    },
                },
            },
            Patente: {
                type: DataTypes.STRING(7),
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "La Patente es requerido",
                    },
                    len: {
                        args: [6, 7],
                        msg: "La Patente debe ser Alfanumerico de 7 simbolos",
                    },
                },
                Unique: {
                    args: true,
                    msg: "esta Patente ya existe en la tabla!",
                },
            },
            Valor: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Valor es requerido",
                    }
                }
            },
            FechaIngreso: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: "Fecha Ingreso es requerido",
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
        },
        {
            // pasar a mayusculas
            hooks: {
                beforeValidate: function (Vehiculo, options) {
                    if (typeof Vehiculo.Modelo === "string") {
                        Vehiculo.Modelo = Vehiculo.Modelo.toUpperCase().trim();
                    }
                },
            },
    
            timestamps: false,
        }
    );
    return Vehiculo
};
