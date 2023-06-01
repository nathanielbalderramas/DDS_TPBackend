const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/autos", async function (req, res, next) {
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
  const { count, rows } = await db.Autos.findAndCountAll({
    attributes: [
      "IdAuto",
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

router.get("/api/autos/:id", async function (req, res, next) {
  let items = await db.Autos.findOne({
    attributes: [
        "IdAuto",
        "Marca",
        "Modelo",
        "Patente",
        "FechaIngreso",
        "Valor",
        "Estado",
    ],
    where: { IdAuto: req.params.id },
  });
  res.json(items);
});

router.post("/api/autos/", async (req, res) => {
  try {
    let data = await db.Autos.create({
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

router.put("/api/autos/:id", async (req, res) => {
  try {
    let item = await db.Autos.findOne({
      attributes: [
        "IdAuto",
      "Marca",
      "Modelo",
      "Patente",
      "FechaIngreso",
      "Valor",
      "Estado",
      ],
      where: { IdAuto: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Auto no encontrado" });
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

router.delete("/api/autos/:id", async (req, res) => {
  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.Autos.destroy({
      where: { IdAuto: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE Autos SET Estado = case when Estado 1 =  then 0 else 1 end WHERE IdAuto = :IdAuto",
        {
          replacements: { IdAuto: +req.params.id },
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
});
module.exports = router;

