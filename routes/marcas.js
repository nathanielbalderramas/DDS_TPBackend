const express = require('express');
const router = express.Router();
// const db = require("../data/db-init")
const {
    getMarcas,
    makeMarcas
} = require("../controllers/controller.aux")


router.get("/getmarcas", getMarcas);
router.get("/makemarcas", makeMarcas)

module.exports = router;