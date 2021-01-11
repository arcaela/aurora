/**************    Object   **************/
const Object = window.Object;
Object.is = function(_ob_){
    try{ return (_ob_ instanceof Object||typeof _ob_=='object')?_ob_:( String.is(_ob_)?JSON.parse(_ob_):null );
    }catch(e){ return null; }
};
Object.count=_ob_=>Object.keys(_ob_).length;
Object.__pop = _ob_=>Object.filter(_ob_);
Object.addPrototype = function(_ob_, Target){
    return Object.each(_ob_,(value, index)=>(Target.prototype||Target.__proto__)[index]=value),Target;
};
/****** Collections *******/
Object.each=function(_ob_,loop){
    return Object.keys(_ob_).forEach(key=>loop.call(_ob_,_ob_[key],key)),_ob_;
}
Object.except = (_ob_,keys=[])=>Object.filter(_ob_,(v,k)=>keys.indexOf(k)<0);
Object.only = (_ob_,keys=[])=>Object.filter(_ob_,(v,k)=>keys.indexOf(k)>=0);
Object.filter = function(_ob_,loop,N={}){
    return Object.keys(_ob_).forEach(key=>{
        if((Function.is(loop)?loop:noblank).call(_ob_,_ob_[key],key)) N[key]=_ob_[key];
    }),N;
};
Object.flip = function(_ob_){
    return Object.mapWithKeys(_ob_,function(val, key){
        return (String.is(val)||Number.is(val))?[val, key]:[key,val];
    });
}
Object.forget = (_ob_, keys)=>(Object.filter(_ob_,(val,key)=>(keys.indexOf(key)<0)));
Object.has = (_ob_, key)=>( Object.is(_ob_)&&(key in _ob_)?_ob_:null );
Object.map = function(_ob_,loop){
    return Object.keys(_ob_).forEach(key=>{
        _ob_[key]=loop.call(_ob_,_ob_[key],key);
    }),_ob_;
};
Object.mapWithKeys=function(_ob_, callback){
    return _obn_={},Object.values(Object.map(_ob_, callback)).forEach(kv=>{
        _obn_[kv[0]]=kv[1];
    }),_obn_;
}
Object.merge = function _(...o){
    return o.reduce((_,_o)=>{
        return (!_o||typeof _o!=='object')?_
            :Object.entries(_o).reduce((target,info)=>{
                if(info[1]&&typeof info[1]==='object'&&typeof target[info[0]]==='object')
                    target[info[0]]=Object.merge(target[info[0]], info[1]);
                else target[info[0]]=info[1];
                return target;
            },_);
    },{});
};
Object.diff = function(...objects){
    let deletes = [];
    return objects.filter(Object.is).reduce(function(target, current){
        Object.keys(current).forEach(function(key){
            if(deletes.indexOf(key)<0){
                if(!(key in target)) target[key]=current[key];
                else{
                    if(current[key]===target[key]){
                        delete target[key];
                        deletes.push(key);
                    }
                    else{ target[key]=current[key]; }
                };
            }
        });
        return target;
    },{});
}
Object.noop = (_ob_,callback)=>callback.call(_ob_,_ob_);
Object.transform = (_ob_,callback)=>(callback.call(_ob_,_ob_),_ob_);
export default Object;