/*
* Archivo de configuración de express
* http://expressjs.com/en/starter/hello-world.html
*/
const utils = require('../vendor/utils');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.static = (...arg)=>express.static(...arg);
app.use( cors() );
app.use( bodyParser.urlencoded({ extended:true }) );
app.use( bodyParser.json() );

utils.require('~/app/Kernel')
    .middlewares.main.forEach(path=>app.use(utils.require(path)));

module.exports = app;