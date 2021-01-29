function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Redirect as RedirectComponent, Route as RouteComponent, Switch } from 'react-router-dom';
const Provider = {
  routes: [],
  fallback: () => /*#__PURE__*/React.createElement("span", null, "404")
};

function Route(path, render = null) {
  const route = new Proxy({}, {
    get(_, key) {
      if (key === 'json') return () => _;else if (key === 'provider') return _.Provider; // else if(key==='match') return (new pathToRegex(_.path)).match;

      return value => (route[key] = value, flush());
    }

  });

  const flush = () => route;

  Provider.routes.push(route.path(path).render(render));
  return Provider.routes.slice(-1)[0];
}

;

Route.fallback = fallback => Provider.fallback = fallback;

function RouteProvider() {
  return /*#__PURE__*/React.createElement(Switch, null, Provider.routes.map(({
    json
  }) => {
    const {
      path,
      redirect,
      render,
      ...props
    } = json();
    if (redirect) return /*#__PURE__*/React.createElement(RedirectComponent, _extends({
      from: path,
      to: redirect
    }, props));
    if (typeof render === 'object' && typeof render.$$typeof == 'symbol') return /*#__PURE__*/React.createElement(RouteComponent, _extends({}, props, {
      children: render
    }));

    if (render.prototype && render.prototype.isReactComponent) {
      const RenderComponent = render;
      return /*#__PURE__*/React.createElement(RouteComponent, null, request => /*#__PURE__*/React.createElement(RenderComponent, request));
    }
  }), /*#__PURE__*/React.createElement(Route, null, Provider.fallback));
}

;
export { Route, Provider, RouteProvider };