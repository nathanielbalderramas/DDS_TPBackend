const { Model, DataTypes } = require("sequelize");
const {db: sequelize} = require("./db-init");

const Marca = sequelize.define(
    "Marca",
    {}, // fields
    {} // options
);

const Estado = sequelize.define(
    "Estado",
    {}, // fields
    {} // options
);

const Proovedor = sequelize.define(
    "Proovedor",
    {}, // fields
    {} // options
);

const Cliente = sequelize.define(
    "Cliente",
    {}, // fields
    {} // options
);

module.exports =  { Marca, Estado, Proovedor, Cliente};