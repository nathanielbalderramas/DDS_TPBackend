require('dotenv').config({path: "../.env"});
const Sequelize = require("sequelize");
function db_init (database, user, password, dialect) {
    const sequelize = new Sequelize(database, user, password, {dialect: dialect});
    return sequelize;
}

const db = db_init(process.env.DATABASE, process.env.USER, process.env.PASSWORD, process.env.DIALECT);

module.exports = { db };