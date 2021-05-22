#!/usr/bin/env node
module.exports = require('./src/vendor/utils').CLI(require(
    require('path').resolve(__dirname, (`src/app/commands/${process.argv[2]||'start'}`).replace(':','/'))
));
