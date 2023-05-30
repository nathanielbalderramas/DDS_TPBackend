const express = require('express');
const router = express.Router();
const db = require("../data/db-init")

router.get("/api/marcas", async function (req, res, next) {
    let data = db.Marca.findall();
    res.json(data)
})

module.exports = router;