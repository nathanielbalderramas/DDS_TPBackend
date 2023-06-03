const { Alquiler, Vehiculo } = require("../data/db-link")

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
        const alquileres = await Alquiler.findAll({
            where: {IdAlquiler: req.params.idAlquiler}
        });
        if (alquileres.length > 0) {
            res.status(200).json(alquileres);
        } else {
            res.status(404).json({mensaje: "¡No encontrado!"})
        }
    } catch (error) {
            res.status(500).json(error);
    }
}

const postAlquileres = async (req, res, next) => {
    try {
        if (! ("FechaInicio" in req.body)) {
            res.status(500).json("Alquiler parameter are required").end();
        }
        const inputParams = {
            FechaInicio: req.body.FechaInicio,
            FechaFin: req.body.FechaFin,
            FechaFinReal: req.body.FechaFinReal ? req.body.FechaFinReal : null,
            Monto: req.body.Monto,
            IdVehiculo: req.body.IdVehiculo,
        };
        const alquiler = await Alquiler.create(inputParams);
        res.status(200).json(alquiler).end() ;
    } catch (error) {
        res.status(500).json(error);
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


const mockMakeAlquileres = async (req, res, next) => {
    try {
        const alquileres = await Alquiler.bulkCreate([
            {IdVehiculo: 1, FechaInicio: "2023-05-02", FechaFin: "3023-05-02", FechaFinReal: null, Monto: 93300, },
            {IdVehiculo: 1, FechaInicio: "2023-05-03", FechaFin: "3023-05-03", FechaFinReal: null, Monto: 124100, },
            {IdVehiculo: 1, FechaInicio: "2023-05-04", FechaFin: "3023-05-04", FechaFinReal: null, Monto: 43000, },
            {IdVehiculo: 1, FechaInicio: "2023-05-01", FechaFin: "2023-05-21", FechaFinReal: null, Monto: 86100, },
            {IdVehiculo: 1, FechaInicio: "2023-05-02", FechaFin: "2023-05-22", FechaFinReal: null, Monto: 53000, },
            {IdVehiculo: 1, FechaInicio: "2023-05-03", FechaFin: "2023-05-23", FechaFinReal: null, Monto: 49900, },
            {IdVehiculo: 1, FechaInicio: "2008-05-08", FechaFin: "2008-05-18", FechaFinReal: "2008-05-17", Monto: 62600, },
            {IdVehiculo: 1, FechaInicio: "2014-09-04", FechaFin: "2014-09-09", FechaFinReal: "2014-09-09", Monto: 74700, },
            {IdVehiculo: 1, FechaInicio: "2022-05-06", FechaFin: "2022-05-16", FechaFinReal: "2022-05-16", Monto: 76500, },
            {IdVehiculo: 1, FechaInicio: "2003-07-07", FechaFin: "2003-08-07", FechaFinReal: "2003-08-08", Monto: 113500, },
            {IdVehiculo: 1, FechaInicio: "2022-05-06", FechaFin: "2022-05-16", FechaFinReal: "2023-05-16", Monto: 76500, },
            {IdVehiculo: 1, FechaInicio: "2023-05-01", FechaFin: "2023-06-05", FechaFinReal: "2023-07-05", Monto: 85800, },
        ], {validate: true});
        res.status(200).json(alquileres)
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
    mockMakeAlquileres,
    makeUnVehiculoFalso, // must be removed once Vehiculo is implemented
}