const express = require('express');
const router = express.Router();
const { getAlquileres, makeAlquileresRandom, makeUnVehiculoFalso } = require("../controllers/controller.alquiler");

router.get("/randomdata/alquileres", makeAlquileresRandom);

router.get("/alquileres", getAlquileres);

router.get("/randomdata/vehiculoFalso", makeUnVehiculoFalso)

module.exports = router;