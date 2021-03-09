require('./configs/routes');

module.exports.firebase = require('./configs/firebase').default;

module.exports.error = require('./helpers/error').default;
module.exports.getter = require('./helpers/getter').default;
module.exports.Google = require('./helpers/Google').default;

module.exports.api = require('./libs/api').default;
module.exports.scopes = require('./libs/scopes').default;
module.exports.default = module.exports.api;

module.exports.useAuth = require('./hooks/useAuth').default;
module.exports.useInputs = require('./hooks/useInputs').default;