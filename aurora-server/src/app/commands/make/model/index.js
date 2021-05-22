const fs = require('fs');
const path = require('path');
const utils = require('../../../utils');
const { scandir, ucfirst } = utils.require('~/vendor');

module.exports = {
    arguments:'<cmd> [name]',
    options:[
        {
            name:'-T --template, <path>',
            description:'Ruta donde se almacena el modelo',
            defaultValue:path.resolve(__dirname, "./template/"),
        },
        {
            name:'--output, <path>',
            description:'Ruta donde se guardará el modelo',
            defaultValue:path.resolve(__dirname, '../../../models/'),
        },
    ],
    action(cmd, name, options){
        const params = {
            name,
            path:options.output,
            template:options.template,
            get destinity(){ return `${this.path}/${ucfirst(this.name)}/`;},
        };
        if(! params.name ){
            console.log("Se requiere un nombre para el modelo");
            process.exit(404);
        }
        else if(fs.existsSync( params.destinity )){
            console.log("Ya existe un modelo con este nombre");
            process.exit(403);
        }
        try {
            scandir.copyDirSync( params.template, params.destinity );
            console.log(`${ucfirst( params.name )} creado en: `, params.destinity);
        } catch (error) {
            console.error( error );
            process.exit( 500 );
        }
    },
};