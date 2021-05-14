#!/usr/bin/env node
const path = require('path');
module.exports = {
  action(){
    console.log(
      "No se han encontrado comandos pero puedes intentar con:"
      +`\n$ ${ path.basename( process.title ) } --help`
    );
  },
};