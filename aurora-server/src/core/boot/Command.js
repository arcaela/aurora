const core = require('../index');


core.Command('start',{
  arguments:'<start> [props]',
  usage:'Iniciar el servidor en modo "desarrollo" o "producción".',
  options:[
    { name:'-E, --env <dev|prod>', description:'Entorno de ejecución del servidor', macros:[{tag:'--dev',value:'dev'},{tag:'--prod',value:'prod'}], defaultValue:process.env.NODE_ENV||'dev', },
    { name:'-P,--port <integer>', description:'Número entero del puerto donde correrá el servidor', macros:[{tag:'--dev',value:'3000'},{tag:'--prod',value:'5000'}], defaultValue:process.env.PORT||3000, },
    { name:'--wsp <integer>', description:'Número entero del puerto donde correrá el servidor de WebSockets (BETA)', defaultValue:false, },
  ],
  async action(...[,,options]){
    const Providers = core.Kernel.providers;
    let length = {min:0,max:(Providers.main.length+Providers.daemons.length)};
    const spinner = require('ora')(`Loading ${length.min}/${length.max} providers...`).start();
    try {
      for(let provider of Providers.main){
        if(typeof provider==='string') provider = require(provider);
        if(typeof provider==='function') provider = new provider(core)
        if(provider instanceof core.Provider) await provider.boot();
        else if(typeof provider==='object' && 'boot' in provider) await provider.boot(core);
        length.min++;
        spinner.text = `Loaded ${length.min}/${length.max} providers...`;
      }
      for(let provider of Providers.daemons){
        if(typeof provider==='string') provider = require(provider);
        if(typeof provider==='function') provider = new provider(core)
        if(provider instanceof core.Provider) provider.boot();
        else if(typeof provider==='object' && 'boot' in provider) provider.boot(core);
        length.min++;
        spinner.text = `Loaded ${length.min}/${length.max} providers...`;
      }
      spinner.stop();
      core.server = require('http').createServer( require('express')().use( core.Router ) );
      core.server.listen(options.port, ()=>{
        const table = new (require('cli-table'))();
        core.Logger.log(`\n!Server Started as ${options.env==='dev'?'development':'production'} mode!`);
        table.push(
          ["ENV", "NAMESPACE","HOST"],
          [options.env, "Localhost","http://localhost:"+options.port],
        ).toString();
        core.Logger.log( table.toString() );
      });
    }
    catch (error) { spinner.fail(error.message); }
  },
});

core.Command('make:model',{
  usage:'Crear un Modelo de colección utilizando Mongoose',
  arguments:'<command> [tags]',
  options:[
    { name:'-n,--name, <name>', description:'Nombre para almacenar el Modelo', defaultValue:null, },
    { name:'-t,--template, <name>', description:'Origen de plantilla para el Modelo', defaultValue:__dirname+'/assets/ModelTemplate/', },
    { name:'--output, <path>', description:'Ruta donde se guardará el Modelo', defaultValue:aurora.paths.src('app/models/{NAME}/'), },
  ],
  async action(...[,name,options]){
    options.name = options.name||name;
    if(!options.name||!options.name.match(/^[a-zA-Z0-9]+$/))
      return process.exit( console.error(`"${options.name}"`.yellow, 'no es un nombre válido para el Modelo.') )
    try {
      const fs = require('fs');
      options.output = options.output.replace("{NAME}", options.name);
      if(!fs.existsSync( aurora.paths.app("models") ))
        fs.mkdirSync( aurora.paths.app("models") );
    ////////////////////////////
    core.vendor.directory.copyDirSync( options.template, options.output );
    ////////////////////////////
      core.Logger.log("Modelo creado!");
      core.Logger.warn( options.output );
    } catch (error) { core.Logger.error(error); }
  },
});


core.Command('make:provider',{
  usage:'Crear un Proveedor',
  arguments:'<command> [tags]',
  options:[
    { name:'-n,--name, <name>', description:'Nombre para almacenar el Proveedor', defaultValue:null, },
    { name:'-t,--template, <name>', description:'Origen de plantilla para el Proveedor', defaultValue:__dirname+'/assets/ProviderTemplate.js', },
    { name:'--output, <path>', description:'Ruta donde se guardará el Proveedor', defaultValue:aurora.paths.src('app/providers/{NAME}.js'), },
  ],
  async action(...[,name,options]){
    options.name = options.name||name;
    if(!options.name||!options.name.match(/^[a-zA-Z0-9]+$/))
      return process.exit( console.error(`"${options.name}"`.yellow, 'no es un nombre válido para el Proveedor.') )
    try {
      const fs = require('fs');
      options.output = options.output.replace("{NAME}", options.name);
      if(!fs.existsSync( aurora.paths.app("providers") ))
        fs.mkdirSync( aurora.paths.app("providers") );
    ////////////////////////////
      await fs.writeFileSync( options.output, fs.readFileSync( options.template, 'utf-8' ).replace('AppProvider',options.name) );
    ////////////////////////////
      core.Logger.log("Proveedor creado!");
      core.Logger.warn( options.output );
    } catch (error) { core.Logger.error(error); }
  },
});


core.Command('make:middleware',{
  usage:'Crear un Middleware genérico',
  arguments:'<command> [tags]',
  options:[
    { name:'-n,--name, <name>', description:'Nombre para almacenar el Middleware', defaultValue:null, },
    { name:'-t,--template, <name>', description:'Origen de plantilla para el Middleware', defaultValue:__dirname+'/assets/MiddlewareTemplate.js', },
    { name:'--output, <path>', description:'Ruta donde se guardará el Middleware', defaultValue:aurora.paths.src('app/middlewares/{NAME}.js'), },
  ],
  async action(...[,name,options]){
    options.name = options.name||name;
    if(!options.name||!options.name.match(/^[a-zA-Z0-9]+$/))
      return process.exit( console.error(`"${options.name}"`.yellow, 'no es un nombre válido para el Middleware.') )
    try {
      const fs = require('fs');
      options.output = options.output.replace("{NAME}", options.name);
      if(!fs.existsSync( aurora.paths.app("middlewares") ))
        fs.mkdirSync( aurora.paths.app("middlewares") );
    ////////////////////////////
      await fs.writeFileSync( options.output, fs.readFileSync( options.template, 'utf-8' ).replace('MiddlewareTemplate',options.name) );
    ////////////////////////////
      core.Logger.log("Middleware creado!");
      core.Logger.warn( options.output );
    } catch (error) { core.Logger.error(error); }
  },
});