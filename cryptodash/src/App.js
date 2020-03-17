import React from 'react';

import store from "./redux/store/index";
import { addSubscription } from "./redux/actions/index";

import { SWRConfig } from 'swr';

import './App.css';
import Home from './home';

import Button from '@material-ui/core/Grid';

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
      <Button variant="contained" onClick={() => {
          const payload = {
            crypto: 'BTC',
            price: 1900,
            active: true,
          }
          store.dispatch(addSubscription(payload));
        }
      }>clicl</Button>
      </SWRConfig>
  );
}

export default App;
