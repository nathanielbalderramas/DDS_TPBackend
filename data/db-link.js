require('dotenv').config({path: "../.env"});
const path = require("path")
const { touch_db } = require("./db-init");
const Sequelize = require("sequelize");

function db_link (database, user, password, dialect) {
    touch_db();
    const sequelize = new Sequelize(path.resolve(database), user, password, {dialect: dialect});
    return sequelize;
}

const db = db_link(process.env.DATABASE, process.env.USER, process.env.PASSWORD, process.env.DIALECT);


async function check_db(db) {
    // Authentication
    try {
        await db.authenticate();
        console.log("Authentications succesfull!")
    } catch (error) {
        console.log("Authentications Failed!")
        console.error(error);
        return
    }

    // Sync
    try {
        await db.sync();
        console.log("Sync succesfull!");
    } catch (error) {
        console.log("Sync Failed!");
        console.error(error);
        return;
    }
};

module.exports = { db, check_db };