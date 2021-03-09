import { get, set, merge } from 'lodash'

export default function useGetter(_ob_, _events){
    const _module = merge({
        onSet(){},
        onGet(){},
        onUpdate(){},
    },_events,{
        get(key, optional=null){
            this.onGet(_ob_, key, optional);
            return get(_ob_, key, optional);
        },
        set(key,value){
            let path=key.split('.')[0];
            this.onSet(_ob_, key, value);
            set(_ob_, key, value);
            if(!(path in getter))
            Object.defineProperty(getter, path ,{
                enumerable:true,
                get:()=>getter(key),
                set:(value)=>getter(key,value),
            });
            this.onUpdate(_ob_);
            return value;
        },
    });
    const getter = (key,...props)=>{
        return (props.length)?_module.set(key, props[0]):_module.get(key);
    };
    return Object.defineProperties(getter, Object.keys(_ob_).reduce((properties, key)=>{
        properties[key]={enumerable:true, get:()=>getter(key), set:(value)=>getter(key,value)};
        return properties;
    },{}));
}