const { Schema } = require("mongoose");
/*
    Schemas Middlewares
    Utiliza métodos de Mongoose Schema 
    @ https://mongoosejs.com/docs/middleware.html#pre
    @ https://mongoosejs.com/docs/middleware.html#post
*/

function hasPermissions(schema=Schema.prototype, permissions={}){
    const _ = require("lodash");
    const getKeys = (obj={}, index='', arr=[])=>{
        return Object.entries(obj).reduce((_, [key,value])=>{
                if(value && typeof value==='object' && !Array.isArray(value))
                    getKeys(value, index?index+'.'+key:key, arr);
                else if(value===true) arr.push(index?index+'.'+key:key);
            return arr;
        },[]);
    }
    const permissionsArray = (...allows)=>getKeys(_.merge(...allows));
    schema.method('isPermission', function(...request){
        return _.difference(permissionsArray(permissions,this.permissions), request.flat() ).length<1;
    });
    schema.method('anyPermission', function(...request){
        return _.intersection( permissionsArray(permissions,this.permissions), request.flat() ).length>0;
    });
}



module.exports = (schema=Schema.prototype)=>{
    
    schema.plugin(hasPermissions , {
        update:{
            id:false,
            uid:false,
            email:true,
            cedula:true,
            displayName:true,
            phoneNumber:true,
            voting:{
                departament:true,
                municipality:true,
                point:true,
                table:true,
            },
            address:{
                string:true,
            }
        },
    });
    

};