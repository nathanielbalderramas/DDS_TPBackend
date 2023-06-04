const { DataTypes } = require("sequelize");

/*
const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

`CREATE table Clientes( 
                id INTEGER PRIMARY KEY AUTOINCREMENT
              , NombreApellido TEXT NOT NULL 
              , Documento TEXT NOT NULL UNIQUE
              );`
*/
module.exports = function (db) {
    const Reparacion = db.define(
        "Cliente",
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            NombreApellido:{
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Nombre y Apellido es requerido",
                    },
                    len: {
                        args: [3, 100],
                        msg: "Apellido y Nombres deben ser tipo carateres, entre 3 y 60 de longitud",
                    },
                },
            },
            Documento: {
                type: DataTypes.STRING(11),
                allowNull: false,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "EL numero de Documento es requerido",
                    },
                    len: {
                        args: [8, 11],
                        msg: "Número de documento deben ser tipo carateres, entre 8 y 11 de longitud",
                    },
                },
            }
        }, // fields
        {
            // pasar a mayusculas
            hooks: {
                beforeValidate: function (cliente, options) {
                    if (typeof cliente.NombreApellido === "string") {
                        cliente.NombreApellido = cliente.NombreApellido.toUpperCase().trim();
                    }
                },
            },
        } // options
    );
    return Reparacion;
};