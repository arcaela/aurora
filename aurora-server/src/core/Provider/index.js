const _ = require('lodash');
module.exports = class Provider {
    constructor(context){
        _.assign(this, context);
    }
    boot(){

    }
}