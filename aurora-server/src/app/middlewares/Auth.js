module.exports = function(req, res, next){
    return req.auth?next():res.json({
        ok:false,
        error:null,
        message:"Se requiere un inicio de sesión",
        timestamp:Date.now(),
    });
}