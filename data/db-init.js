require('dotenv').config();
import { Sequelize } from "sequelize";

function db_init (database, user, password, dialect) {
    const sequelize = new Sequelize(database, user, password, {dialect: dialect});
    return sequelize;
}

const db = db_init(database, user, password, dialect);

export { db };