const mongoose = require("mongoose");
/*
*   Los modelos de datos construyen una instancia de Mongoose Schema
*   Estos datos son enviados ahora a mongoose.model para crear el Modelo de Mongoose
*   
*   https://mongoosejs.com/docs/models.html#compiling
*/
module.exports = {
    // posts: mongoose.model('Post', require('./Post')),
    users: mongoose.model('User', require('./User')),
};