import React from 'react'
export * from './AuroraDB'
export * from './Collection'
export * from './firebase'
export * from './Route'
export * from './Theme'

import { Theme } from './Theme';
import { RouteProvider } from './Route';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

export default function AuroraJS() {
  const { theme } = Theme();
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <RouteProvider />
  </ThemeProvider>);
}