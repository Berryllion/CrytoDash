import React from 'react';

import { SWRConfig } from 'swr';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import Home from './home';

const fetcher = url => fetch(url, {
  headers: { 'X-CoinAPI-Key': 'FF5D3F62-6505-4EBA-81DC-5127E4B34380' }
}).then(r => r.json());

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007aa5'
    },
  },
});

function App() {
  return (
      <SWRConfig
        value={{
          refreshInterval: 60000,
          fetcher: fetcher
        }}
      >
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </SWRConfig>
  );
}

export default App;
