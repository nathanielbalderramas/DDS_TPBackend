// Cristian Julián Canelo 80619 3K4 

const db = require("../data/db-link");
const express = require('express');
const router = express.Router();
// const { makeVentas } = require("../controllers/controller.Venta");
const { Op, ValidationError } = require("sequelize");

router.get("/ventas", async function (req, res, next) {
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
  } catch (error) {
      res.status(500).json(error);
  }
});

router.get("/ventas/make", async function (req, res, next) {
  makeVentas();
  return res.json("Venta Creados");
});

router.get("/ventas/:id", async function (req, res, next) {
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
});

router.post("/ventas/", async (req, res) => {
  try {
    let data = await db.Venta.create({
        Vehiculo: req.body.Vehiculo,
        Fecha: req.body.Fecha,
        Cliente: req.body.Cliente,
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

router.put("/ventas/:id", async (req, res) => {
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
    item.Fecha = req.body.Fecha;
    item.Cliente = req.body.Cliente;
    item.Estado = req.body.Estado;
    
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

router.delete("/ventas/:id", async (req, res) => {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE Ventas SET Estado = case when Estado 1 =  then 0 else 1 end WHERE IdVehiculo = :IdVehiculo",
        {
          replacements: { id: +req.params.id },
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