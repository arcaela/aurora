import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import useTheme, { Theme } from './hooks/useTheme'
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import useRoutes, { Route, RouteComponent } from './hooks/useRoutes';

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
  Theme,
  Route,
  AuroraJS,
  useTheme,
  useRoutes,
};
