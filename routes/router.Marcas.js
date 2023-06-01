const express = require('express');
const router = express.Router();
// const db = require("../data/db-init")
const {
    getMarcas,
    getMarca,
    makeMarcas
} = require("../controllers/controller.Marca")


router.get("/getmarcas", getMarcas);
router.get("/makemarcas", makeMarcas)

module.exports = router;