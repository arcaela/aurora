#!/usr/bin/env node
require('./src/core/boot/global');
require( aurora.paths.src("core/boot/Aliasses") );
require( aurora.paths.src("core/boot/Command") );
// require('~/core').Command.exec(...process.argv.slice(2));





const { Storage } = require('~/core')


Storage('aws', AmazonWS)