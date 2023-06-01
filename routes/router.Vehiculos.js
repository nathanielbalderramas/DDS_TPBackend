//Octavio Escudero 3k4 89866

const express = require('express');
const router = express.Router();

const { makeVehiculos, 
        getVehiculos,
        getVehiculo,
        putVehiculo,
        postVehiculos,
        deleteVehiculo,
} = require("../controllers/controller.Vehiculo");

router.get("/vehiculos", getVehiculos);

router.get("/vehiculosDisponibles", getVehiculos);

router.get("/vehiculos/make", makeVehiculos);

router.get("/vehiculos/:id", getVehiculo);

router.post("/vehiculos/", postVehiculos);

router.put("/vehiculos/:id", putVehiculo);

router.delete("/vehiculos/:id", deleteVehiculo);

module.exports = router;