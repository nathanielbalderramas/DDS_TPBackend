const db = require("../data/db-link");
const express = require('express');
const { Op, ValidationError } = require("sequelize");

function getFechaActual(){
    let date = new Date()
    mes = date.getMonth() + 1;
    fecha = date.getDate() + "-"+ mes + "-" +date.getFullYear();
    return fecha;
  }

const getVentas = async function (req, res, next) {
    try {
        const ventas = await db.Venta.findAll({
            attributes: [
              "id",
              "Vehiculo",
              "Fecha",
              "Cliente",
              "Estado",
            ],
            order: [["id", "DESC"]],
        });
        
        res.status(200).json(ventas);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}


const getVenta = async (req, res, next) => {
    try {
        let items = await db.Venta.findOne({
            attributes: [
              "id",
              "Vehiculo",
              "Fecha",
              "Cliente",
              "Estado",
              
            ],
            where: { id: req.params.id },
          });
        res.json(items);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
}
};

const postVenta = async (req, res) => {
    try {
        let data = await db.Venta.create({
            Vehiculo: req.body.Vehiculo,
            Fecha: getFechaActual(),
            Cliente: req.body.Cliente,
            Estado: 1,
        });
    
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
      
    } catch (err) {
        console.log(err)
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

const putVenta = async (req, res) => {
    try {
        let item = await db.Venta.findOne({
          attributes: [
            "id",
            "Vehiculo",
            "Fecha",
            "Cliente",
            "Estado",
          ],
          where: { id: req.params.id },
        });
    
        if (!item) {
          res.status(404).json({ message: "Venta no encontrada" });
          return;
        }
        
        item.Vehiculo = req.body.Vehiculo;
        item.Cliente = req.body.Cliente;
        item.Estado = req.body.Estado;
        
        await item.save();
    
        res.sendStatus(200);
    
    } catch (err) {
        console.log(err)
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

const deleteVenta = async (req, res) => {
    // baja logica
    try {
        let data = await db.sequelize.query(
          "UPDATE Ventas SET Estado = case when Estado 1 =  then 0 else 1 end WHERE id = :id",
          {
            replacements: { id: +req.params.id },
          }
        );
  
        res.sendStatus(200);
      
      } catch (err) {
        console.log(err)
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

module.exports = {
    getVentas,
    getVenta,
    postVenta,
    putVenta,
    deleteVenta
};