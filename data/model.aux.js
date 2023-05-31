const { Model, DataTypes } = require("sequelize");
const {db} = require("./db-link");

const Marca = db.define(
    "Marca",
    {id: {type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          },
     nombre: {type: DataTypes.STRING,
              allowNull: false,
              unique: true
            }
    }, 
    {} // options
);

const Estado = db.define(
    "Estado",
    {}, // fields
    {} // options
);

const Proveedor = db.define(
    "Proveedor",
    {}, // fields
    {} // options
);

const Cliente = db.define(
    "Cliente",
    {}, // fields
    {} // options
);

module.exports =  { Marca, Estado, Proveedor, Cliente };