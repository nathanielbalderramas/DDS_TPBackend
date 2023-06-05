// Cristian Julián Canelo 80619 3K4

const express = require('express');
const router = express.Router();

const { getVentas,
        getVenta,
        postVenta,
        putVenta,
        deleteVenta
} = require("../controllers/controller.Venta");

router.get("/ventas", getVentas); //Obtiene los ventas 

// router.get("/ventas/make", makeventas); //Agrega ventas 

router.get("/ventas/:id", getVenta); //Busqueda de ventas por ID

router.post("/ventas", postVenta); //Carga de ventas por Body

router.put("/ventas/:id", putVenta); //Modifica un venta de un ID enviado

router.delete("/ventas/:id", deleteVenta); //Realiza la baja logica del venta

module.exports = router;