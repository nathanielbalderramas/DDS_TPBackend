//const { Marca, Proveedor, Estado, Cliente } = require("../data/model.aux");
const { Marca } = require("../data/db-link")


const getMarcas = async (req, res, next) => {
    try {
        const marcas = await Marca.findAll();
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json(error);
    }
}

const makeMarcas = async (req, res, next) => {
    try {
        const marcas = await Marca.bulkCreate([
            {nombre: "Audi"},
            {nombre: "Alfa Romero"},
            {nombre: "Bentley"},
            {nombre: "Chevrolet"},
            {nombre: "Daiatsu"},
            {nombre: "Fiat"},
            {nombre: "Ford"},
            {nombre: "Honda"},
            {nombre: "Hyundai"}
        ], {validate: true});
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    getMarcas,
    makeMarcas
};