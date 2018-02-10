import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import Reboot from 'material-ui/Reboot';
import AppShell from './script/AppShell';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

if (process.browser) {
  window.theme = theme;
}


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Reboot />
        <AppShell />
      </MuiThemeProvider>,
  document.getElementById('app')
);

