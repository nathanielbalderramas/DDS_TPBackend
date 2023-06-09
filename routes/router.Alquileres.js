const express = require('express');
const router = express.Router();
const { 
    getAlquileres, 
    getAlquileresById,
    postAlquileres,
    putAlquileres,
    deleteAlquileres,
    mockMakeAlquileres, 
    makeUnVehiculoFalso 
} = require("../controllers/controller.Alquiler");

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
router.get("/alquileres/:id", getAlquileresById);

/**
 * @openapi
 * /api/alquileres:
 *   post:
 *     description: should inseert a single record of Alquiler.
 *     responses:
 *       200:
 *         description: Succesfully inserts a single record of Alquiler and returns it.
 *       500:
 *          description: Something wrong happened.
 */
router.post("/alquileres", postAlquileres);

/**
 * @openapi
 * /api/alquileres:
 *   put:
 *     description: should modify a single record of Alquiler.
 *     responses:
 *       200:
 *         description: Succesfully modfies a single record of Alquiler and returns it.
 *       404:
 *          description: There where no matching records of Alquiler to be found.
 *       500:
 *          description: Something wrong happened.
 */
router.put("/alquileres", putAlquileres);

/**
 * @openapi
 * /api/alquileres:
 *   put:
 *     description: should modify a single record of Alquiler.
 *     responses:
 *       200:
 *         description: Succesfully modfies a single record of Alquiler and returns it.
 *       404:
 *          description: There where no matching records of Alquiler to be found.
 *       500:
 *          description: Something wrong happened.
 */
router.delete("/alquileres/:id", deleteAlquileres);

router.get("/mockdata/alquileres", mockMakeAlquileres);
router.get("/randomdata/vehiculoFalso", makeUnVehiculoFalso)


module.exports = router;