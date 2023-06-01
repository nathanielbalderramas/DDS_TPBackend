//Octavio Escudero 3k4 89866

const db = require("../data/db-link");
const express = require('express');
const router = express.Router();
const { makeVehiculos } = require("../controllers/controller.Vehiculo");
const { Op, ValidationError } = require("sequelize");

router.get("/vehiculos", async function (req, res, next) {
  let busqueda = {};
  if (req.query.Marca != undefined && req.query.Marca !== "") {
    busqueda.Marca = {
          [Op.like]: "%" + req.query.Marca + "%",
      };
  }
  if (req.query.Modelo != undefined && req.query.Modelo !== "") {
    busqueda.Modelo = {
        [Op.like]: "%" + req.query.Modelo + "%",
      };
}
  const { count, rows } = await db.Vehiculo.findAndCountAll({
    attributes: [
      "IdVehiculo",
      "Marca",
      "Modelo",
      "Patente",
      "FechaIngreso",
      "Valor",
      "Estado",
    ],
    order: [["FechaIngreso", "DESC"]],
    busqueda,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/vehiculos/make", async function (req, res, next) {
  makeVehiculos();
  return res.json("Vehiculos Creados");
});

router.get("/vehiculos/:id", async function (req, res, next) {
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
});

router.post("/vehiculos/", async (req, res) => {
  try {
    let data = await db.Vehiculo.create({
        Marca: req.body.Marca,
        Modelo: req.body.Modelo,
      Patente: req.body.Patente,
      Valor: req.body.Precio,
      FechaIngreso: req.body.FechaAlta,
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
});

router.put("/vehiculos/:id", async (req, res) => {
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
    item.Precio = req.body.Precio;
    item.FechaAlta = req.body.FechaAlta;
    item.Activo = req.body.Activo;
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
});

router.delete("/vehiculos/:id", async (req, res) => {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE Vehiculo SET Estado = case when Estado 1 =  then 0 else 1 end WHERE IdVehiculo = :IdVehiculo",
        {
          replacements: { IdVehiculo: +req.params.id },
        }
      );
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
  }
);
module.exports = router;

