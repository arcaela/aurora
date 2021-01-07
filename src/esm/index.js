function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRouterDom = require('react-router-dom');
var core = require('@material-ui/core');
var pathToRegex = _interopDefault(require('path-to-regex'));

var Theme = {
  $all: {},
  $theme: null,
  DEFAULT_THEME: core.createMuiTheme({}),

  get theme() {
    return this.$theme || this.$all['DEFAULT'] || this.DEFAULT_THEME;
  },

  create: function create(key, props) {
    return this.$all[key] = core.createMuiTheme(props);
  },
  use: function use(key) {
    return key in this.$all ? this.$theme = this.$all[key] : null;
  }
};

function useTheme() {
  var _useState = React.useState(Theme.theme),
      theme = _useState[0],
      setTheme = _useState[1];

  Theme.$theme = theme;

  Theme.use = function (key) {
    if (key && key in Theme.$all) Theme.$theme = Theme.$all[key];
    return setTheme(Theme.theme);
  };

  return Theme;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

var Provider = {
  routes: [],
  fallback: function fallback() {
    return /*#__PURE__*/React__default.createElement("span", null, "404");
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
    history: reactRouterDom.useHistory(),
    location: reactRouterDom.useLocation(),

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
    return /*#__PURE__*/React__default.createElement(_RouteComponent, request);
  }

  return RouteSelected.render(request);
}

var RouteClass = /*#__PURE__*/function () {
  function RouteClass(path, render) {
    if (render === void 0) {
      render = null;
    }

    this.Provider = Provider;
    this.$props = {};

    this.match = function () {};

    return this.path(path).render(render);
  }

  var _proto = RouteClass.prototype;

  _proto.path = function path(_path) {
    this.$props.path = _path;

    this.match = function (pathStr) {
      return new pathToRegex(_path).match(pathStr);
    };

    return this;
  };

  _proto.render = function render(_render) {
    this.$props.render = _render;
    this.$props.redirect = null;
    return this;
  };

  _proto.redirect = function redirect(_redirect) {
    this.$props.redirect = _redirect;
    return this;
  };

  return RouteClass;
}();

function Route() {
  var route = _construct(RouteClass, Array.prototype.slice.call(arguments));

  Provider.routes.push(route);
  return route;
}

Route.redirect = function (from, to) {
  return Route(from).redirect(to);
};

Route.fallback = function (fallback) {
  return Provider.fallback = fallback;
};

Route.find = function (path) {
  return Provider.routes.filter(function (route) {
    return route.match(path);
  })[0];
};

function useRoutes() {
  return Provider;
}

function AuroraJS() {
  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  return /*#__PURE__*/React__default.createElement(core.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React__default.createElement(core.CssBaseline, null), /*#__PURE__*/React__default.createElement(reactRouterDom.BrowserRouter, null, /*#__PURE__*/React__default.createElement(RouteComponent, null)));
}

exports.Route = Route;
exports.Theme = Theme;
exports.default = AuroraJS;
exports.useRoutes = useRoutes;
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map
