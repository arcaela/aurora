const { Schema } = require("mongoose");
/*
    Schemas Middlewares
    Utiliza métodos de Mongoose Schema 
    @ https://mongoosejs.com/docs/middleware.html#pre
    @ https://mongoosejs.com/docs/middleware.html#post
*/
module.exports = (schema=Schema.prototype)=>{
    return schema.plugin(require('mongoose-role'),{
        roles: ['admin','moderator','editor','user'],
        accessLevels: {
            admin: ['admin'],
            moderator: ['admin','moderator'],
            editor: ['admin','moderator','editor'],
            user: ['admin','moderator','editor','user'],
        }
    });
};