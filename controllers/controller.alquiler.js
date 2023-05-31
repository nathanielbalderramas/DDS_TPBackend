const { Alquiler, Vehiculo } = require("../data/db-link")

function makeDate () {
    let year = 2001 + Math.floor(Math.random() * 22);
    let month = 1 + Math.floor(Math.random() * 12);
    let day = 1 + Math.floor(Math.random() * 30);
    if (month == 2 && day > 28) {day = 28}
    return `${year}-${month}-${day}`}

function makeMonto () {
    return Math.floor(Math.random()*2000 + Math.random()*100000 + 20000) 
}

const getAlquileres = async (req, res, next) => {
    try {
        const alquileres = await Alquiler.findAll();
        res.status(200).json(alquileres)
    } catch (error) {
        res.status(500).json(error)
    }
}

const makeAlquileresRandom = async (req, res, next) => {
    try {
        console.log()
        const alquileres = await Alquiler.bulkCreate([
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
            {IdVehiculo: 1, FechaInicio: new Date(makeDate()), FechaFin: new Date(makeDate()), Monto: makeMonto(), },
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
    makeAlquileresRandom,
    makeUnVehiculoFalso, // must be removed once Vehiculo is implemented
}