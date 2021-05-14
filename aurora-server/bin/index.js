#!/usr/bin/env node

const command = process.argv[2].replace(':','/');
const file = require('path').resolve(__dirname, `commands/${command}`);

module.exports = require('./utils').CLI( require(file) );