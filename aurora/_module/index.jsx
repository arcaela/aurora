import React from 'react'
export * from './firebase'
export * from './hooks'
export * from './JavaScript'

import { useTheme } from './hooks/useTheme';
import { RouteProvider } from './hooks/useRoute';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

export default function AuroraJS() {
  const { theme } = useTheme();
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <RouteProvider />
    </BrowserRouter>
  </ThemeProvider>);
}

