const express = require('express');
const router = express.Router();
const { 
    getAlquileres, 
    getAlquileresById,
    postAlquileres,
    putAlquileres,
    deleteAlquileres,
    randomMakeAlquileres, 
    makeUnVehiculoFalso 
} = require("../controllers/controller.alquiler");


router.get("/alquileres", getAlquileres);
router.get("/alquileres/:id", getAlquileresById);
router.post("/alquileres", postAlquileres);
router.put("/alquileres", putAlquileres);
router.delete("/alquileres", deleteAlquileres);

router.get("/randomdata/alquileres", randomMakeAlquileres);
router.get("/randomdata/vehiculoFalso", makeUnVehiculoFalso)


module.exports = router;