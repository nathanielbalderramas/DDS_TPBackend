const { DataTypes } = require("sequelize");

/*
const {db} = require("./db-link");
const { Vehiculo } = require("./model.Vehiculo");
*/

function calcularEstado(fechaInicio, fechaFin, fechaFinReal) {
    if (fechaFinReal == null && fechaInicio < fechaFin) {return "En Curso"}
    else if (fechaFinReal == null && fechaFin < new Date()) {return "En Mora"}
    else if (fechaFinReal !== null && fechaFinReal <= fechaFin) {return "Finalizado"}
    else if (fechaFinReal !== null && fechaFinReal > fechaFin) {return "Finalzado con demora"}
}


module.exports = function ( db ) {
    const Alquiler  = db.define(
        "Alquiler",
        {
        IdAlquiler: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            },
        FechaInicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            },
        FechaFin: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                esPosteriorAFechaInicio(value) {
                    if (Date.parse(value) <= Date.parse(this.FechaInicio)) {
                    throw new Error('FechaFin debe ser posterior a FechaInicio');
                        }
                    }
                }
            },
            FechaFinReal: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                validate: {
                    esPosteriorAFechaInicio(value) {
                        if (Date.parse(value) <= Date.parse(this.FechaInicio)) {
                        throw new Error('FechaFinReal debe ser posterior a FechaInicio');
                        }
                    }
                }
            },
            Monto: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                validate: {
                    isFloat: true,
                    min: 0
                }
            },
            Estado: {
                type: DataTypes.VIRTUAL,
                get() {
                return calcularEstado(this.FechaInicio, this.FechaFin, this.FechaFinReal);
                },
                set(value) {
                throw new Error('Do not try to set the `Estado` value!');
                }
            },
        }, // fields
        {} // options
    );
    return Alquiler;
};