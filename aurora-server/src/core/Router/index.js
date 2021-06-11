const Router = require('express').Router();
Router.use((req, res, next)=>{
    const {merge,pick,omit,get} = require('lodash');
    /*
        Construiremos 3 métodos:
        - Input
        - Only
        - Except
        He utilizado Laravel INPUT como inspiración
        https://laravel.com/docs/master/requests#retrieving-input
        Request:
            url:'/auth/user/1?token=Mi_token'
            body: {displayName:Alejandro, email:arcaela@...}
        Servidor:
            req.input(); => {displayName:Alejandro, email:arcaela@...}
            req.input('displayName') || req.input.displayName; => Alejandro
            req.input('displayName','email'); => {displayName:Alejandro, email:arcaela@...}
            req.except('email'); => {displayName:Alejandro}
            req.only('email'); => {email:arcaela@...}
    */
    const inputs = merge({}, req.query, req.body);
    req.input = new Proxy((...keys)=>{
        keys=keys.flat();
        return !keys.length?inputs:(keys.length>1?pick(inputs, keys):get(inputs, keys[0], null));
    },{ get:(_,key)=>get(inputs,key,null), set:(_,k,v)=>(set(inputs,k,v),v) })
    req.only = (...keys)=>pick(inputs, keys.flat());
    req.except = (...keys)=>omit(inputs, keys.flat());

    /* JSON Response Defaults */
    res.success =(data)=>res.json({data,ok:true,timestamp:Date.now()});
    res.error =(error)=>res.json({error,ok:false,timestamp:Date.now(),message:typeof error==='string'?error:(error.message||'Error: undefined')});
    next();
});
module.exports = Router;