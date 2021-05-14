module.exports = require('./mutators')(new (require('mongoose').Schema)(
    require('./model'),{
    timestamps:true,
    collection:'users',
}));