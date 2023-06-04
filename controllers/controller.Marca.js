const db = require("../data/db-link");


const getMarcas = async (req, res, next)=> {
    try {
        const marcas = await db.Marca.findAll({
            attributes: [
              "id",
              "Nombre"
        ],
    });
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getMarca = async ( req, res, next) => {
    let where = {};
    
    try {
        const sendMarca = await db.Marca.findAll({
            attributes: [
                "id",
                "Nombre"
            ],
            where,
          });
        res.status(200).json(sendMarca);
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
            {nombre: "Hyundai"},
            {nombre: "VW"}
        ], {validate: true});
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    getMarca,
    getMarcas,
    makeMarcas
};