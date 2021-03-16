import { merge, get } from 'lodash';
import pathToRegex from 'path-to-regex';
import $store from './store';

function reduce(arr, prefix=''){
    if(Array.isArray(arr)) return reduce(merge(...arr));
    return Object.entries(arr).reduce((paths, [ path, callback ])=>{
        if(typeof callback==='object') return {...paths, ...reduce(callback, `${prefix}/${path}`)};
        path=(`${prefix}/${path}`).match(/:?\w+/gi)?.join('.').toLowerCase();
        return {
            ...paths,
            [path]:{ path, callback, regExp: new pathToRegex(path), },
        };
    },{});
}

export default function api(path, ...props){
    const endPoints = $store.get('api.routes', {});
    path = (path.match(/:?\w+/gi)?.join('.') || path).toLowerCase();
    let params=null;
    let route = get(endPoints, path, null) || Object.values(endPoints).find(_route=>{
        params = _route.regExp.match(path) || params;
        if(params) props=([params,...props]).slice(_route.regExp.keys.length?0:1);
        return !!params;
    }) || {props,callback:()=>Promise.reject({code:404,message:'ROUTE_NOT_FOUND'})};
    return route.callback(...props);
}
api.load = (routes)=>$store.merge({api:{routes:reduce(routes)}});