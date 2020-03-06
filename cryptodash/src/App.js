import React from 'react';

import { SWRConfig } from 'swr'

import './App.css';
import Home from './homePage/home.js';

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <Home />
    </SWRConfig>
  );
}

export default App;
