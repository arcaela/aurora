const aurora = {};
const path = require('path');
const _ = require('lodash');

aurora.paths={
    root(...c){ return path.join(__dirname,'../../../', ...c); },
    src(...c){ return this.root('./src',...c); },
    app(...c){ return this.root('./src/app',...c); },
    config(...c){ return this.root('./src/config',...c); },
    routes(...c){ return this.root('./src/routes',...c); },
};


const core = require( aurora.paths.src("core") );


aurora.config = {
    state:core.vendor.directory( aurora.paths.config() ).reduce((c,{filename,path})=>({
        ...c,
        [filename]:require(path)
    }),{}),
    get(...e){return _.get(this.state,...e);},
    set(...e){return _.set(this.state,...e);},
};



global.aurora=aurora;