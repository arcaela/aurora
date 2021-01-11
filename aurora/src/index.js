import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import firebase from './firebase/index';
import { Theme, Route, useTheme, Provider, useRoutes, RouteComponent } from './hooks';

function AuroraJS() {
  const {
    theme
  } = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(RouteComponent, null)));
}

export { AuroraJS, firebase, Theme, Route, useTheme, Provider, useRoutes, RouteComponent };