const { Alquiler, Vehiculo } = require("../data/db-link")

function randomDate () {
    let year = 2001 + Math.floor(Math.random() * 22);
    let month = 1 + Math.floor(Math.random() * 12);
    let day = 1 + Math.floor(Math.random() * 30);
    if (month == 2 && day > 28) {day = 28}
    return `${year}-${month}-${day}`}

function randomMonto () {
    return Math.floor(Math.random()*2000 + Math.random()*100000 + 20000) 
}

const getAlquileres = async (req, res, next) => {
    try {
        const alquileres = await Alquiler.findAll();
        if (alquileres.length > 0) {
            res.status(200).json(alquileres);
        } else {
            res.status(404).json({mensaje: "!No encontrado!"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAlquileresById = async (req, res, next) => {
    try {
        const alquileres = await Alquiler.findall({
            where: {IdAlquiler: req.params.id}
        });
        if (alquileres.length > 0) {
            res.status(200).json(alquileres);
        } else {
            res.status(404).json({mensaje: "!No encontrado!"})
        }
    } catch (error) {
            res.status(500).json(error);
    }
}

const postAlquileres = async (req, res, next) => {
    try {
        const inputParams = {
            FechaInicio: req.params.FechaInicio,
            FechaFin: req.params.FechaFin,
            FechaFinReal: req.params.FechaFinReal || null,
            Monto: req.params.Monto,
            IdVehiculo: req.params.IdVehiculo,
        };
        const alquiler = await Alquiler.create(inputParams);
        res.status(200) ;
    } catch (error) {
        res.status(500);
    }
}

const putAlquileres = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(500);
    }
}


const deleteAlquileres = async (req, res, next) => {
    try {

    } catch (error) {
        res.status(500);
    }
}


const randomMakeAlquileres = async (req, res, next) => {
    try {
        console.log()
        const alquileres = await Alquiler.bulkCreate([
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(randomDate()), FechaFin: new Date(randomDate()), Monto: randomMonto(), },
        ]);
        res.status(500).json(alquileres)
    } catch (error) {
        res.status(500).json(error)
    }
}


// This is only for dev purposes. Must be eliminated once Vehiculo is implemented!

const makeUnVehiculoFalso = async (req, res, next) => {
    try {
    const vehiculo = await Vehiculo.create({});
    res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    getAlquileres, 
    getAlquileresById,
    postAlquileres,
    putAlquileres,
    deleteAlquileres,
    randomMakeAlquileres,
    makeUnVehiculoFalso, // must be removed once Vehiculo is implemented
}