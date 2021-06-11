const Schema = new (require('mongoose').Schema)(
    require('./model'),{
    // timestamps:true,
    // collection:'collection_name',
});
require('./mutators')(Schema);
module.exports = Schema;