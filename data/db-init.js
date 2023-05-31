require("dotenv").config({path: "../.env"});
const sqlite3 = require("sqlite3").verbose();

async function touch_db() {
    const sqdb = new sqlite3.Database(process.env.DATABASE)
    await sqdb.close();
}

module.exports = {touch_db}