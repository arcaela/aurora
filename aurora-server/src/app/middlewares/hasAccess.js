/*
    Roles y Permisos | Documentación Oficial
    https://www.npmjs.com/package/mongoose-role?activeTab=readme#usage
*/
module.exports = function hasAccess(accessLevel) {
    return function(req, res, next) {
        const error = !req.auth?"Se requiere iniciar sesión":(
            !req.auth.hasAccess(accessLevel)?"No tienes permisos para realizar esta acción":null
        );
        return (!error)?next():res.json({ ok:false, error,message:error, timestamp:Date.now(), });
    }
}