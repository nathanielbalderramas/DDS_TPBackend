require('dotenv').config({path: "../.env"});
const Sequelize = require("sequelize");

function db_init (database, user, password, dialect) {
    const sequelize = new Sequelize(database, user, password, {dialect: dialect});
    return sequelize;
}

// Por alguna razon cunando uso process.env.DIALECT (que vale "sqlite") me da error :/
const db = db_init(process.env.DATABASE, process.env.USER, process.env.PASSWORD, "sqlite");

module.exports = { db };