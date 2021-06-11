const { Schema } = require("mongoose");
const plugins = require("./plugins");
/*
    Schemas Middlewares
    Utiliza métodos de Mongoose Schema 
    @ https://mongoosejs.com/docs/middleware.html#pre
    @ https://mongoosejs.com/docs/middleware.html#post
*/

module.exports = (schema=Schema.prototype)=>{
    schema.plugin(plugins.permissions , {/*
        That's suggested data
        read:true,
        write:true,
    */});
    
    schema.plugin(plugins.firebase , {
        foreignKey:'uid',
        credential:{/*
            Same object to firebase.initializeApp() but write only configuration "credential"
            Read more at: https://firebase.google.com/docs/reference/admin/node/admin#.initializeApp
        */},
    });
};