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

/**
 * @openapi
 * /api/alquileres:
 *   get:
 *     description: should return all records of Alquiler.
 *     responses:
 *       200:
 *         description: Succesfully returns all records of Alquiler.
 *       404:
 *          description: There where no records of Alquiler to be found.
 *       500:
 *          description: Something wrong happened.
 */
router.get("/alquileres", getAlquileres);


/**
 * @openapi
 * /api/alquileres/:idAlquiler:
 *   get:
 *     description: should return a single record of Alquiler with matching IdAlquiler.
 *     responses:
 *       200:
 *         description: Succesfully returns a single record of Alquiler with matching IdAlquiler
 *       404:
 *          description: There where no matching records of Alquiler to be found.
 *       500:
 *          description: Something wrong happened.
 */
router.get("/alquileres/:idAlquiler", getAlquileresById);
router.post("/alquileres", postAlquileres);
router.put("/alquileres", putAlquileres);
router.delete("/alquileres", deleteAlquileres);

router.get("/randomdata/alquileres", randomMakeAlquileres);
router.get("/randomdata/vehiculoFalso", makeUnVehiculoFalso)


module.exports = router;