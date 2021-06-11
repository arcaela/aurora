const { Schema } = require("mongoose");
const firebase = require("firebase-admin");
const { get, has, merge } = require("lodash");



exports.firebase = function (schema=Schema.prototype, options={}){
    options = Object.assign({
        credential:{},
        foreignKey:'uid',
    },options);
    const app = firebase.initializeApp( options.credential );

    schema.set(options.foreignKey,{
        unique:true,
        type:Schema.Types.String,
        set:value=>String(value).replace(/[^a-zA-Z0-9]+/g,''),
        require:[true, `El campo ${options.foreignKey} es necesario para cada registro.`],
    });
    schema.set('phoneNumber',{
        unique:true,
        sparse: true,
        default:null,
        type:Schema.Types.Number,
        validate:{
            validator: v=>/^\+?\d{11,}$/.test(v),
            message: props => `${props.value} no es un número de teléfono válido.`
        },
        set:value=>String(value).replace(/\D+/g,""),
        get:value=>value||null,
    });
    schema.set('email',{
        unique:true,
        sparse: true,
        default:null,
        type:Schema.Types.String,
        validate:{
            validator: v=>/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v),
            message: props => `${props.value} no es una dirección de e-mail válida.`
        },
        get:value=>value||null,
        set:value=>String( value ).replace(/\s+/g,'').toLocaleLowerCase(),
    });
    schema.method('merge', function(...data){
        data = merge(...data);
        this.schema.eachPath(path=>{
            if (path==="_id"||path==="_v") return;
            if(has(data,path))
                this.set(path, get(data, path));
        });
        return this;
    });
    schema.static('getUser', async function(uid=null){
        let query = String( uid ).trim();
        const user = await ({
            email:email=>app.auth().getUserByEmail(email),
            phoneNumber:phoneNumber=>app.auth().getUserByPhoneNumber(phoneNumber),
            uid:uid=>app.auth().getUser(uid),
        })[query.match(/^\+?\d{9,}$/)?'phoneNumber':(
            query.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
            ?'email':'uid'
        )](query);
        if(!user.uid)
            throw new Error("(FB:ERR) El usuario no se encuentra registrado en el servidor.");
        const doc = await this.findOne({[options.foreignKey]:user.uid});
        if(!doc)
            throw new Error("(MDB:ERR) El usuario no se encuentra registrado en el servidor");
        return doc;
    });
    schema.static('updateUser', async function(uid, data={}){
        const doc = await this.getUser(uid);
        const user = await firebase.auth().updateUser(uid,data);
        await doc.merge(data, user.toJSON()).save();
        return doc;
    });
    schema.static('deleteUser', async function(uid){
        const doc = await this.getUser(uid);
        await doc.delete();
        return app.auth().deleteUser( uid );
    });
};


/*
    Se agregan métodos personalizados para el manejo de permisos en los usuarios
    const doc = await mongoose...
    await doc.setPermission('anyPermission', {any:'permission'}, ['morePermission']);
    
    doc.hasPermission('anyPermisssion') => true
    doc.hasPermission('video.streaming') => false
    doc.hasPermission('anyPermisssion','post.create') => false
    doc.hasAnyPermission('anyPermisssion','post.create') => true
*/
exports.permissions = function pluginPermissions(schema=Schema.prototype, permissions={}){
    const _ = require('lodash')
    const toObject = (...arrays)=>_.merge(...arrays.flat().map(arr=>arr&&typeof arr==='object'?{...arr}:(
        typeof arr==='string'?_.set({},arr,true):(Array.isArray(arr)?toObject(arr):{})
    )))
    const toArray = (...objects)=>Object.entries( toObject(...objects) )
        .reduce((arrays, [key,value])=>{
            if(value)
                if(Array.isArray(value)||typeof value==='object')
                    arrays.push(...toArray(value).map(e=>`${key}.${e}`))
                else arrays.push(key);
            return arrays;
        },[]);
    schema.set('permissions',{
        type:Schema.Types.Mixed,
        default:{},
    });
    schema.method('setPermission',function (...scopes){
        this.permissions = merge(this.permissions, toObject(scopes));
        return this.updateOne();
    });
    schema.method('hasPermission', function (...scopes){
        return !_.difference(toArray(permissions,this.permissions),toArray(scopes)).length;
    });
    schema.method('hasAnyPermission', function(...scopes){
        return _.difference(toArray(permissions,this.permissions),toArray(scopes)).length>0;
    });
};