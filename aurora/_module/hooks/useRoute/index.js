import React from 'react'
import { Redirect as RedirectComponent, Route as RouteComponent, Switch, } from 'react-router-dom';

const Provider = {
    routes:[],
    fallback:()=>(<span>404</span>),
};
function Route(path, render=null){
    const route = new Proxy({}, {
        get(_, key){
            if(key==='json') return ()=>_;
            else if(key==='provider') return _.Provider;
            // else if(key==='match') return (new pathToRegex(_.path)).match;
            return (value)=>(route[key]=value, flush());
        },
    });
    const flush = ()=>route;
    Provider.routes.push(route.path(path).render(render));
    return Provider.routes.slice(-1)[0];
};
Route.fallback = fallback=>(Provider.fallback=fallback);

function RouteProvider(){
    return (<Switch>
        {Provider.routes.map(({json})=>{
            const {path, redirect, render, ...props} = json();
            if( redirect )
                return <RedirectComponent from={path} to={redirect} {...props} />;
            if( typeof render === 'object' && typeof render.$$typeof == 'symbol' )
                return (<RouteComponent {...props} children={render} />);
            if(render.prototype && render.prototype.isReactComponent){
                const RenderComponent = render;
                return (<RouteComponent>{(request)=><RenderComponent {...request} />}</RouteComponent>);
            }
        })}
        <Route>{Provider.fallback}</Route>
    </Switch>);
};
export { Route, Provider, RouteProvider, };
