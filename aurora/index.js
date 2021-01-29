import React from 'react';
import { useTheme } from './hooks/useTheme';
import { RouteProvider } from './hooks/useRoute';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
export default function AuroraJS() {
  const {
    theme
  } = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(RouteProvider, null)));
}