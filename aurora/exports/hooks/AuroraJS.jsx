import React from 'react'
import { useTheme } from './useTheme';
import { RouteComponent } from './useRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
export default function AuroraJS() {
  const { theme } = useTheme();
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  </ThemeProvider>);
}