import React from 'react'
import useTheme from './hooks/useTheme'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { RouteComponent } from './hooks/useRoutes';
export default function AuroraJS() {
  const { theme } = useTheme();
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  </ThemeProvider>);
}
