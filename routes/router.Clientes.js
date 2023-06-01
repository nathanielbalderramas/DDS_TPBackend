//Cristian Julián Canelo 80619 3k4 

const db = require("../data/db-link");
const express = require('express');
const router = express.Router();
const { Op, ValidationError } = require("sequelize");

router.get("/clientes", async function (req, res, next) {
    let where = {};
    if (req.query.Documento != undefined && req.query.Documento !== "") {
      where.Documento = {
            [Op.like]: "%" + req.query.Documento + "%",
        };
    }
    if (req.query.NombreApellido != undefined && req.query.NombreApellido !== "") {
      where.NombreApellido = {
          [Op.like]: "%" + req.query.NombreApellido + "%",
        };
  }
    const { count, rows } = await db.Cliente.findAndCountAll({
      attributes: [
        "id",
        "NombreApellido",
        "Documento",
      ],
      order: [["id", "ASC"]],
      where,
    });
  
    return res.json({ Items: rows, RegistrosTotal: count });
  });

  router.get("/clientes/:id", async function (req, res, next) {
    let items = await db.Cliente.findOne({
      attributes: [
        "id",
        "NombreApellido",
        "Documento",
      ],
      where: { id: req.params.id },
    });
    res.json(items);
  });

  router.post("/clientes/", async (req, res) => {
    try {
      let data = await db.Cliente.create({
          NombreApellido: req.body.NombreApellido,
          Documento: req.body.Documento,
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

  router.put("/clientes/:id", async (req, res) => {
    try {
      let item = await db.Cliente.findOne({
        attributes: [
          "id",
          "NombreApellido",
          "Documento",
        ],
        where: { id: req.params.id },
      });

      if (!item) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }

      item.NombreApellido = req.body.NombreApellido;
      item.Documento = req.body.Documento;
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

  router.delete("/clientes/:id", async (req, res) => {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE Clientes SET Estado = case when Estado 1 =  then 0 else 1 end WHERE id = :id",
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