#!/usr/bin/env node
const utils = require('../utils');
const http = require('http');
const { merge } = require('lodash');
const { express } = utils.require('~/config');
const server = http.createServer( express );
const Kernel = utils.require('~/app/Kernel');


const action = async (options)=>{
  try {
    await Promise.all(Kernel.providers.main.map(e=>{
      const provider=merge(utils.require(e), {server,express});
      return ('boot'in provider)&&provider.boot()
    })).then(()=>Kernel.providers.daemons.forEach(e=>{
      const provider=merge(utils.require(e), {server,express});
      return ('boot'in provider)&&provider.boot()
    }));

    server.listen(options.port, ()=>{
      console.log(`¡Server Started on "${options.env==='dev'?'development':'production'}" environment!`);
      console.log("Listen on http://localhost:"+options.port+" hostname");
    });
  } catch (error) { console.error(error); }
};





module.exports = {
  // arguments:'<start> [props]',
  action,
  options:[
    {
      name:'-P,--port <integer>',
      description:'Número entero del puerto donde correrá el servidor',
      defaultValue:'3000',
      macros:[
        {tag:'--dev',value:'3000'},
        {tag:'--prod',value:'5000'},
      ],
    },
    {
      name:'-E, --env <dev|prod>',
      description:'Entorno de ejecución del servidor (dev por defecto)',
      defaultValue:'dev',
      macros:[
        {tag:'--dev',value:'dev'},
        {tag:'--prod',value:'prod'},
      ],
    }
  ],
};