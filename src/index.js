import React from 'react'
import useTheme from './hooks/useTheme'
import { RouteComponent } from './hooks/useRoutes';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
export default function AuroraJS() {
  const { theme } = useTheme();
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  </ThemeProvider>);
}
