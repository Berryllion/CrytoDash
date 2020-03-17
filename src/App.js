import React from 'react';

import store from "./redux/store/index";

import { SWRConfig } from 'swr';

import './App.css';
import Home from './home';

window.store = store;
store.subscribe(() => store.getState());

const fetcher = url => fetch(url, {
  headers: { 'X-CoinAPI-Key': 'FF5D3F62-6505-4EBA-81DC-5127E4B34380' }
}).then(r => r.json());

function App() {
  return (
      <SWRConfig
        value={{
          refreshInterval: 5000,
          fetcher: fetcher
        }}
      >
        <Home />
      </SWRConfig>
  );
}

export default App;
