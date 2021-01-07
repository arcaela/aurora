import React from 'react'
import pathToRegex from 'path-to-regex'
import { useHistory, useLocation } from 'react-router-dom';


/* Provider */
const Provider = {
    routes:[],
    fallback:()=>(<span>404</span>),
};

function RouteComponent(){
    const RouteSelected = Provider.routes.reduce((selected, route)=>{
        if(selected) return selected;
        route.$props.params = route.match(window.location.pathname);
        return route.$props.params?route.$props:null;
    },null) || { render:Provider.fallback, params:{}, };
    const request = {
        route:RouteSelected,
        history:useHistory(),
        location:useLocation(),
        get params(){ return this.route.params; },
        redirect(path){ return this.history.replace(path); },
    };
    if( RouteSelected.redirect )
        return request.history.replace(RouteSelected.redirect);
    if( typeof RouteSelected.render === 'object' && typeof RouteSelected.render.$$typeof == 'symbol' )
        return RouteSelected.render;
    if(RouteSelected.render.prototype && RouteSelected.render.prototype.isReactComponent){
        const RouteComponent = RouteSelected.render;
        return <RouteComponent {...request} />
    }
    return RouteSelected.render(request);
};

/* Model */
class RouteClass {
    Provider = Provider
    $props = {};
    match = ()=>{}
    constructor(path, render=null){ return this.path(path).render(render); }
    path(path){
        this.$props.path = path;
        this.match = (pathStr)=>(new pathToRegex(path)).match(pathStr);
        return this
    }
    render(render){
        this.$props.render=render;
        this.$props.redirect=null;
        return this;
    }
    redirect(redirect){
        this.$props.redirect=redirect;
        return this;
    }
}


function Route(){
    const route = new RouteClass(...arguments);
    Provider.routes.push(route);
    return route;
}
Route.redirect = (from,to)=>(Route(from).redirect(to));
Route.fallback = fallback=>(Provider.fallback=fallback);
Route.find = (path)=>Provider.routes.filter(route=>route.match(path))[0];


function useRoutes(){ return Provider; }

export default useRoutes;
export {
    Route,
    Provider,
    useRoutes,
    RouteComponent,
};