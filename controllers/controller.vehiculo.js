const { Vehiculo } = require("../data/db-init")

const makeVehiculos = async (req, res, next) => {
    try {
        console.log();
        const Vehiculos = await Vehiculo.bulkCreate([
            {IdVehiculo: 1, Marca:1 ,Modelo: "Punto 1.8", Patente: 'JEQ550',FechaIngreso: '2010-01-19', Valor: 10000, Estado: 1, },
            {IdVehiculo: 2,Marca:10 ,Modelo:"GOL 1.6", Patente:'AA212XC', Valor:15000,FechaIngreso:'2016-02-10', Estado:1, },
            {IdVehiculo: 3,Marca:6 ,Modelo: "FOCUS 1.8",Patente: 'HWE340', Valor:12000,FechaIngreso:'2013-02-28', Estado:1, },
            {IdVehiculo: 4,Marca:5 ,Modelo: "Punto 1.4",Patente: 'JPQ450', Valor:10000,FechaIngreso:'2015-01-11',Estado: 1, },
            {IdVehiculo: 5,Marca:6 ,Modelo: "FIESTA", Patente:'PLE145', Valor:10000,FechaIngreso:'2014-07-10', Estado:1, },
            {IdVehiculo: 6,Marca:5 ,Modelo: "SIENA", Patente:'AE323RE', Valor:10000,FechaIngreso:'2022-03-12',Estado: 1, },
            {IdVehiculo: 7,Marca:1 ,Modelo: "A3", Patente:'AH434SE', Valor:10000,FechaIngreso:'2023-06-13',Estado: 1, },
            {IdVehiculo: 8,Marca:6 ,Modelo: "RANGER", Patente:'JTR852', Valor:10000,FechaIngreso:'2021-05-23', Estado:1, },
            {IdVehiculo: 9,Marca:5 ,Modelo: "KANGOO", Patente:'OVY213', Valor:10000,FechaIngreso:'2020-03-07',Estado: 1, },
            {IdVehiculo: 10,Marca:10 , Modelo: "BORA 1.8",Patente: 'JIJ090', Valor:12000,FechaIngreso:'2015-02-01',Estado: 1, },
        ],);
        res.status(200).json(Vehiculos);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    makeVehiculos
};