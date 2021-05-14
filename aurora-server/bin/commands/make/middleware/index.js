const fs = require('fs');
const path = require('path');
module.exports = {
    arguments:'<cmd> [name]',
    options:[
        {
            name:'-T --template, <path>',
            description:'Ruta donde se almacena el modelo de Middleware',
            defaultValue:path.resolve(__dirname, "./template.js"),
        },
        {
            name:'--output, <path>',
            description:'Ruta donde se guardará el Middleware',
            defaultValue:path.resolve(__dirname, './../../../../src/app/middlewares/'),
        },
    ],
    action(cmd, name, options){
        const params = {
            name,
            path:options.output,
            template:options.template,
            get destinity(){ return `${this.path}/${this.name}.js`;},
        };
        if(! params.name )
            process.exit( console.log("Se requiere un nombre para el Middleware") );
        else if(fs.existsSync( params.destinity ))
            process.exit( console.log("Ya existe un Middleware con este nombre") );
        try {
            const content = fs.readFileSync(params.template, 'utf8');
            fs.writeFileSync(params.destinity, content.replace("NameFunctionMiddleware", `${params.name}Middleware`))
            console.log(`${params.name} creado en: `, params.destinity);
        } catch (error) { process.exit(console.error( error )); }
    },
};


