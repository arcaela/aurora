import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import firebase from './firebase/index'
import { Theme, Route, useTheme, Provider, useRoutes, RouteComponent, } from './hooks'

function AuroraJS() {
  const { theme } = useTheme();
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  </ThemeProvider>);
}

export {
  AuroraJS,
  firebase,
  Theme, Route, useTheme, Provider, useRoutes, RouteComponent,
}
