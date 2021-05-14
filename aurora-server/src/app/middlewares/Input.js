const {merge,pick,omit,get} = require('lodash');
/*
    Construiremos 3 métodos:
    - Input
    - Only
    - Except
    He utilizado Laravel INPUT como inspiración
    Request:
        url:'/auth/user/1?token=Mi_token'
        body:{  password:"MiClaveNueva", email:"arcaela.reyes@gmail.com"  }
    Servidor:
        ruta: /auth/user/:id
        req.input() => { id:1, token:"Mi_token", password:"MiClaveNueva", email:"arcaela.reyes@gmail.com" }
        req.input("token") => Mi_Token
        req.only("token", 'id') => { token:"Mi_Token" ,id:1}
        req.except("token", 'id', 'password') => { email:"arcaela.reyes@gmail.com" }

*/module.exports = function CorsMiddleware(req, res, next){
    const inputs = merge(req.query, req.body);
    req.input = new Proxy((...keys)=>{
        keys = keys.flat();
        return !keys.length?inputs:get(inputs,keys[0],keys[1]||null);
    },{ get:(_,key)=>inputs[key], set:(_,key,value)=>inputs[key]=value, });
    req.only = (...keys)=>pick(inputs, keys.flat());
    req.except = (...keys)=>omit(inputs, keys.flat());
    next();
}