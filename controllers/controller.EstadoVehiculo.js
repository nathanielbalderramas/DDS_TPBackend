const { EstadoVehiculo } = require("../data/db-link")

const getEstados = async (res) => {
    try {
        const marcas = await EstadoVehiculo.findAll();
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getEstado = async (estadoRecibido, res) => {
    let busqueda = {};
    busqueda.id = estadoRecibido;
    try {
        const sendEstado = await db.EstadoVehiculo.findAll({
            attributes: [
              "Nombre"
            ],
            busqueda,
          });;
        res.status(200).json(sendEstado);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getEstado,
    getEstados
};