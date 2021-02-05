function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import pathToRegex from 'path-to-regex';
import { Redirect as RedirectComponent, Route as RouteComponent, Switch } from 'react-router-dom';
const Provider = {
  routes: [],
  fallback: () => /*#__PURE__*/React.createElement("span", null, "404")
};

function Route(path, render = null) {
  const route = new Proxy({}, {
    get(_, key) {
      if (key === 'json') return () => _;else if (key === 'provider') return _.Provider;else if (key === 'match') return new pathToRegex(_.path).match;
      return value => (route[key] = value, flush());
    }

  });

  const flush = () => route;

  const _ob_ = route.path(path).render(render);

  Provider.routes.push(_ob_);
  return _ob_;
}

;

Route.fallback = fallback => Provider.fallback = fallback;

Route.redirect = (from, to) => Route(from).redirect(to);

function RouteProvider() {
  return /*#__PURE__*/React.createElement(Switch, null, Provider.routes.map(({
    json
  }, key) => {
    const {
      path,
      redirect,
      render,
      exact = true,
      ...props
    } = json();
    const RenderComponent = render;
    if (redirect) return /*#__PURE__*/React.createElement(RedirectComponent, _extends({
      from: path,
      to: redirect,
      exact: exact
    }, props, {
      key: key
    }));
    if (typeof RenderComponent === 'object' && typeof RenderComponent.$$typeof == 'symbol') return /*#__PURE__*/React.createElement(RouteComponent, _extends({
      path: path,
      exact: exact
    }, props, {
      children: RenderComponent,
      key: key
    })); // if(render.prototype && render.prototype.isReactComponent)

    return /*#__PURE__*/React.createElement(RouteComponent, _extends({
      path: path,
      exact: exact
    }, props, {
      render: request => /*#__PURE__*/React.createElement(RenderComponent, _extends({
        redirect: request.history.replace,
        params: request.match.params
      }, request)),
      key: key
    }));
  }), /*#__PURE__*/React.createElement(RouteComponent, {
    children: Provider.fallback
  }));
}

;
export { Route, Provider, RouteProvider };