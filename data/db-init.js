require("dotenv").config({path: "../.env"});
const sqlite3 = require("sqlite3").verbose();

async function touch_db() {
    const db = new sqlite3.Database(process.env.DATABASE)
    await db.close();
}

module.exports = {touch_db}