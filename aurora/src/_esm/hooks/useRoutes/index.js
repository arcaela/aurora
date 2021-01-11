function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import pathToRegex from 'path-to-regex';
import { useHistory, useLocation } from 'react-router-dom';
/* Provider */

const Provider = {
  routes: [],
  fallback: () => /*#__PURE__*/React.createElement("span", null, "404")
};

function RouteComponent() {
  const RouteSelected = Provider.routes.reduce((selected, route) => {
    if (selected) return selected;
    route.$props.params = route.match(window.location.pathname);
    return route.$props.params ? route.$props : null;
  }, null) || {
    render: Provider.fallback,
    params: {}
  };
  const request = {
    route: RouteSelected,
    history: useHistory(),
    location: useLocation(),

    get params() {
      return this.route.params;
    },

    redirect(path) {
      return this.history.replace(path);
    }

  };
  if (RouteSelected.redirect) return request.history.replace(RouteSelected.redirect);
  if (typeof RouteSelected.render === 'object' && typeof RouteSelected.render.$$typeof == 'symbol') return RouteSelected.render;

  if (RouteSelected.render.prototype && RouteSelected.render.prototype.isReactComponent) {
    const RouteComponent = RouteSelected.render;
    return /*#__PURE__*/React.createElement(RouteComponent, request);
  }

  return RouteSelected.render(request);
}

;
/* Model */

class RouteClass {
  constructor(path, render = null) {
    _defineProperty(this, "Provider", Provider);

    _defineProperty(this, "$props", {});

    _defineProperty(this, "match", () => {});

    return this.path(path).render(render);
  }

  path(path) {
    this.$props.path = path;

    this.match = pathStr => new pathToRegex(path).match(pathStr);

    return this;
  }

  render(render) {
    this.$props.render = render;
    this.$props.redirect = null;
    return this;
  }

  redirect(redirect) {
    this.$props.redirect = redirect;
    return this;
  }

}

function Route() {
  const route = new RouteClass(...arguments);
  Provider.routes.push(route);
  return route;
}

Route.redirect = (from, to) => Route(from).redirect(to);

Route.fallback = fallback => Provider.fallback = fallback;

Route.find = path => Provider.routes.filter(route => route.match(path))[0];

function useRoutes() {
  return Provider;
}

export default useRoutes;
export { Route, Provider, useRoutes, RouteComponent };