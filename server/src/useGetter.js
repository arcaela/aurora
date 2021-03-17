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
            if(!(path in executor))
            Object.defineProperty(executor, path ,{
                enumerable:true,
                get:()=>executor(key),
                set:(value)=>executor(key,value),
            });
            this.onUpdate(_ob_);
            return value;
        },
    });
    const executor = (key,...props)=>((props.length)?_module.set(key, props[0]):_module.get(key));
    return Object.defineProperties(executor, Object.keys(_ob_).reduce((properties, key)=>{
        properties[key]={enumerable:true, get:()=>executor(key), set:(value)=>executor(key,value)};
        return properties;
    },{}));
}