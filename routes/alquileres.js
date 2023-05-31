const express = require('express');
const router = express.Router();
const { getAlquileres, makeAlquileres } = require("../controllers/controller.alquiler");

router.get("/getalquileres", getAlquileres);
router.get("/makealquileres", makeAlquileres);

module.exports = router;