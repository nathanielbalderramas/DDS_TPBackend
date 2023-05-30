const {db} = requiere("./db-init");

async function populate_db() {
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
        return
    }
}