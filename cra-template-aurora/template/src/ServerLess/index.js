require('./configs/routes');
module.exports.firebase = require('./configs/firebase').default;
module.exports.scopes = require('./libs/scopes').default;
module.exports.useAuth = require('./hooks/useAuth').default;
module.exports.default = module.exports.api;