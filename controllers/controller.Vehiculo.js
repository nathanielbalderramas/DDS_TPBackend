const db = require("../data/db-link");
const express = require('express');
const { Op, ValidationError } = require("sequelize");

const getVehiculos = async function (req, res, next) {
    let where = {};

    //Busqueda por Marca
    if (req.query.Marca != undefined && req.query.Marca !== "") {
        where.Marca = req.query.Marca;
    }

    //Busqueda por Modelo
    if (req.query.Modelo != undefined && req.query.Modelo !== "") {
        where.Modelo = {
            [Op.like]: "%" + req.query.Modelo + "%",
        };
    }

    //Busqueda por Estado de Vehiculos
    if (req.query.Estado != undefined && req.query.Estado !== "") {
        where.Estado = req.query.Estado;
    }

    //Devuele la consulta 
    const { count, rows } = await db.Vehiculo.findAndCountAll({
        attributes: [
            "IdVehiculo",
            "Marca",
            "Modelo",
            "Patente",
            "FechaIngreso",
            "Valor",
            "Estado"
        ],
        order: [["FechaIngreso", "DESC"]],
        where,
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });
}



const getVehiculo = async (req, res, next) => {
    let items = await db.Vehiculo.findOne({
        attributes: [
            "IdVehiculo",
            "Marca",
            "Modelo",
            "Patente",
            "FechaIngreso",
            "Valor",
            "Estado",
        ],
        where: { IdVehiculo: req.params.id },
    });
    res.json(items);
};

const postVehiculos = async (req, res) => {
    try {
        let data = await db.Vehiculo.create({
            Marca: req.body.Marca,
            Modelo: req.body.Modelo,
            Patente: req.body.Patente,
            Valor: req.body.Valor,
            FechaIngreso: req.body.FechaIngreso,
            Estado: 1,
        });
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validacion, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
};

const putVehiculo = async (req, res) => {
    try {
        let item = await db.Vehiculo.findOne({
            attributes: [
                "IdVehiculo",
                "Marca",
                "Modelo",
                "Patente",
                "FechaIngreso",
                "Valor",
                "Estado",
            ],
            where: { IdVehiculo: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "Vehiculo no encontrado" });
            return;
        }
        item.Modelo = req.body.Modelo;
        item.Marca = req.body.Marca;
        item.Patente = req.body.Patente;
        item.Valor = req.body.Valor;
        item.FechaIngreso = req.body.FechaIngreso;
        await item.save();

        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validacion, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
};

const deleteVehiculo = async (req, res) => {
    // baja logica
    try {
        let data = await db.Vehiculo.findOne({
            attributes: [
                "IdVehiculo",
                "Marca",
                "Modelo",
                "Patente",
                "FechaIngreso",
                "Valor",
                "Estado",
            ],
            where: { IdVehiculo: req.params.id },
        });
        if (!data) {
            res.status(404).json({ message: "Vehiculo no encontrado" });
            return;
        }
        data.Estado = 0;
        await data.save();
        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validacion, los devolvemos
            const messages = err.errors.map((x) => x.message);
            res.status(400).json(messages);
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
};

const makeVehiculos = async (req, res, next) => {
    try {
        const Vehiculos = await db.Vehiculo.bulkCreate([
            { Marca: 1, Modelo: "Punto 1.8", Patente: 'JEQ510', FechaIngreso: '2010-01-19', Valor: 10000, Estado: 1, }
        ],);
        res.status(200).json(Vehiculos);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    makeVehiculos,
    getVehiculos,
    getVehiculo,
    postVehiculos,
    putVehiculo,
    deleteVehiculo
};