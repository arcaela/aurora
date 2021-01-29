import { set, get } from 'lodash';
const is_snap = (o)=>(o instanceof Snapshot);
const path = (key)=>key.toString().replace(/\/+/gi,'.');
const is_obj = (o)=>(o&&typeof o==='object'&&!Array.isArray(o));
function mergeDeep(target, ...sources) {
    if (!sources.length) return is_obj(target)?target:{};
    const source = sources.shift(),
        clone = is_obj(target)?{...target}:null;
    if (clone&&is_obj(source)) {
        for (const key in source) {
            clone[key]=( is_obj(clone[key]) && is_obj(source[key]) )
                ?mergeDeep(clone[key], source[key])
                :((Array.isArray(clone[key]) && Array.isArray(source[key]))
                    ?clone[key].concat(...source[key])
                    :source[key]);
        }
    }
    return mergeDeep(clone, ...sources);
}
export default class Snapshot {
    constructor(name='',props={}, root=null){
        this.props = props;
        this.name = name;
        this.root=root;
    }
    data(...o){
        const _object=o.length?o[0]:this.props,
            result = !is_obj(_object)?_object
            :Object.entries(_object).filter(([k,v])=>v!==null).reduce((_,[key, value])=>{
                value = is_snap(value)?value.data():this.data(value);
                if(value!==null) _[key]=value;
                return _;
            },{});
        return ((is_obj(result)&&!Object.keys(result).length)||(Array.isArray(result)&&!result.length)||result===undefined)?null:result;
    }
    exists(){ return Boolean(this.data()) }
    get(key, opt=null){ return get(this.props, path(key), opt) }
    set(key, value){
        set(this.props, path(key), this.data(value));
        if(is_snap(this.root)) this.root.set(this.name, this.data);
        return value;
    }
    update(key, value){
        if(is_obj(key)) return this.props=mergeDeep(this.props, key);
        const prev = this.get(key);
        if(is_obj(prev)&&is_obj(value))
            value = mergeDeep(prev, value);
        return this.set(key, value);
    }
    remove(key){ return this.set(key, null); }
    bucket(name, data=null){
        data = this.get(name, data);
        if(data!==null&&!is_obj(data))
            throw new Error('Intentas crear un almacen con datos noObject, usa bucketForce');
        return new this.constructor(this.name, data, this);
    }
    macro(name, fn){
        this.constructor.prototype[name] = fn;
        return this;
    }
}