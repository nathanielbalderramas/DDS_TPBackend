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

router.get("/vehiculos", getVehiculos); //Obtiene los vehiculos 

router.get("/vehiculos/make", makeVehiculos); //Agrega vehiculos 

router.get("/vehiculos/:id", getVehiculo); //Busqueda de Vehiculos por ID

router.post("/vehiculos", postVehiculos); //Carga de Vehiculos por Body

router.put("/vehiculos/:id", putVehiculo); //Modifica un vehiculo de un ID enviado

router.delete("/vehiculos/:id", deleteVehiculo); //Realiza la baja logica del vehiculo

module.exports = router;