const Schema = new (require('mongoose').Schema)(
    require('./model'),{
    // timestamps:true,
    // collection:'users',
});
require('./mutators')(Schema);
module.exports = Schema;