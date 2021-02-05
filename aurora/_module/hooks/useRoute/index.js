import React from 'react'
import pathToRegex from 'path-to-regex'
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
            else if(key==='match') return (new pathToRegex(_.path)).match;
            return (value)=>(route[key]=value, flush());
        },
    });
    const flush = ()=>route;
    const _ob_ = route.path(path).render(render);
    Provider.routes.push(_ob_);
    return _ob_;
};
Route.fallback = fallback=>(Provider.fallback=fallback);
Route.redirect = (from,to)=>Route(from).redirect(to);

function RouteProvider(){
    return (<Switch>
        {Provider.routes.map(({ json }, key)=>{
            const { path, redirect, render, exact=true, ...props} = json();
            const RenderComponent = render;
            if( redirect ) return <RedirectComponent from={path} to={redirect} exact={exact} {...props} key={key} />;
            if( typeof RenderComponent === 'object' && typeof RenderComponent.$$typeof == 'symbol' )
                return (<RouteComponent path={path} exact={exact} {...props} children={RenderComponent} key={key} />);
            // if(render.prototype && render.prototype.isReactComponent)
                return <RouteComponent path={path} exact={exact} {...props} render={(request)=><RenderComponent redirect={request.history.replace} params={request.match.params} {...request} />} key={key} />
        })}
        <RouteComponent children={Provider.fallback} />
    </Switch>);
};
export { Route, Provider, RouteProvider, };
