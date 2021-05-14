const mongoose = require('mongoose');
const { database } = require('../../config');
module.exports = {
    /* Se llama el método boot apenas se instancia el modelo de datos */
    async boot(){
        /* Mongoose Database Connection */
        return mongoose.connect(`mongodb+srv://${database.user}:${database.password}@${database.host}/${database.path}`, database.options)
            .then(async (db)=>console.log("Database Connected to: ", db.connection.host))
            .catch((e)=>console.log(e.message))
    },
};