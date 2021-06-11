const _ = require('lodash');
const path = require('path')
const aliases = require('module-alias');
module.exports = {
    $alias:{},
    load(){
        aliases.reset();
        aliases.addAliases( this.$alias );
        return this;
    },
    get(key){ return this.alias[key]; },
    set(key,...dest){
        this.alias[key]=path.join(...dest.flat());
        return this.load();
    },
    merge(...alias){
        this.$alias = _.merge(this.$alias, ...alias);
        return this.load();
    },
};