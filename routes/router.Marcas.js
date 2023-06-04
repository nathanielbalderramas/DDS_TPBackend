const express = require('express');
const router = express.Router();
const {
    getMarcas,
    getMarca,
    makeMarcas
} = require("../controllers/controller.Marca")


router.get("/getmarcas", getMarcas);
router.get("/makemarcas", makeMarcas)

module.exports = router;