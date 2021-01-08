import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { useHistory, useLocation, BrowserRouter } from 'react-router-dom';
import 'path-to-regex';

var Theme = {
  $all: {},
  $theme: null,
  DEFAULT_THEME: createMuiTheme({}),

  get theme() {
    return this.$theme || this.$all['DEFAULT'] || this.DEFAULT_THEME;
  },

  create: function create(key, props) {
    return this.$all[key] = createMuiTheme(props);
  },
  use: function use(key) {
    return key in this.$all ? this.$theme = this.$all[key] : null;
  }
};

function useTheme() {
  var _useState = useState(Theme.theme),
      theme = _useState[0],
      setTheme = _useState[1];

  Theme.$theme = theme;

  Theme.use = function (key) {
    if (key && key in Theme.$all) Theme.$theme = Theme.$all[key];
    return setTheme(Theme.theme);
  };

  return Theme;
}

var Provider = {
  routes: [],
  fallback: function fallback() {
    return /*#__PURE__*/React.createElement("span", null, "404");
  }
};

function RouteComponent() {
  var RouteSelected = Provider.routes.reduce(function (selected, route) {
    if (selected) return selected;
    route.$props.params = route.match(window.location.pathname);
    return route.$props.params ? route.$props : null;
  }, null) || {
    render: Provider.fallback,
    params: {}
  };
  var request = {
    route: RouteSelected,
    history: useHistory(),
    location: useLocation(),

    get params() {
      return this.route.params;
    },

    redirect: function redirect(path) {
      return this.history.replace(path);
    }
  };
  if (RouteSelected.redirect) return request.history.replace(RouteSelected.redirect);
  if (typeof RouteSelected.render === 'object' && typeof RouteSelected.render.$$typeof == 'symbol') return RouteSelected.render;

  if (RouteSelected.render.prototype && RouteSelected.render.prototype.isReactComponent) {
    var _RouteComponent = RouteSelected.render;
    return /*#__PURE__*/React.createElement(_RouteComponent, request);
  }

  return RouteSelected.render(request);
}

function AuroraJS() {
  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(RouteComponent, null)));
}

export default AuroraJS;
//# sourceMappingURL=index.modern.js.map
