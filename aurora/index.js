import React from 'react';
export * from './AuroraDB';
export * from './Collection';
export * from './firebase';
export * from './Route';
export * from './Theme';
import { useTheme } from './Theme';
import { RouteProvider } from './Route';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
export default function AuroraJS() {
  const {
    theme
  } = useTheme();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(RouteProvider, null));
}