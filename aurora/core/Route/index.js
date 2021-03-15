import React from 'react'
import pathToRegex from 'path-to-regex'
import { Switch, BrowserRouter, Route as RouteComponent, Redirect as RedirectComponent } from 'react-router-dom';


const Provider = {
    routes:[],
    fallback:()=>(<span>404</span>),
};

function Route(path, render=null){
    const route = new Proxy({},{
        get:(...[,key])=>key==='json'?()=>route:(key==='match'
            ?(new pathToRegex(route.path)).match
            :(value)=>(route[key]=value,route))
    });
    Provider.routes.push(route.path(path).render(render));
    return route;
};
Route.fallback = fallback=>(Provider.fallback=fallback);
Route.redirect = (from,to)=>Route(from).redirect(to);

function RouteProvider(){
    return (<BrowserRouter>
        <Switch>
            {Provider.routes.map((route, key)=>{
                const { path, redirect, render, exact=true, ...props} = route;
                const RenderComponent = render;
                if( redirect ) return <RedirectComponent from={path} to={redirect} exact={exact} {...props} key={key} />;
                if( typeof RenderComponent === 'object' && typeof RenderComponent.$$typeof == 'symbol' )
                    return (<RouteComponent path={path} exact={exact} {...props} children={RenderComponent} key={key} />);
                return <RouteComponent path={path} exact={exact} {...props} render={(request)=><RenderComponent redirect={request.history.replace} params={request.match.params} {...request} />} key={key} />
            })}
            <RouteComponent children={Provider.fallback} />
        </Switch>
    </BrowserRouter>);
};


export { Route, Provider, RouteProvider, };