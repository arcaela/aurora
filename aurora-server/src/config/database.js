/*
*   Configuración para utilizar mongoose con servidor de mongodb
*   
*   Url Schema: https://mongoosejs.com/docs/connections.html#buffering
*
*   Options: https://mongoosejs.com/docs/connections.html#options
*/
module.exports = {
    user:'@user',
    password:'@password',
    host:'@host',
    path:'@path',
    options:{
        useCreateIndex:true,
        useNewUrlParser: true,
        useFindAndModify:false,
        useUnifiedTopology: true,
    },
};