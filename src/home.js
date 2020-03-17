import React from 'react';

import useSWR from 'swr';

import store from './redux/store/index';

import CircularProgress from '@material-ui/core/CircularProgress';

import TopBar from './TopBar/TopBar';
import CryptoList from './CryptoList/CryptoList';
import Logging from './Logging/Logging';

function HelloUser() {
  const username = store.getState()['username'];

  return (
    <div style={{
      color: '#fff',
      fontSize: '2em',
      textAlign: 'center'
    }}>
      Hello {username}.
    </div>
  );
}

function Home() {
  const [rows, setRows] = React.useState([]);
  const [logged, setLogged] = React.useState(false);

  const { data: datacrypto } = useSWR('https://rest.coinapi.io/v1/assets');
  const { data: dataicon } = useSWR('https://rest.coinapi.io/v1/assets/icons/16?', { refreshInterval: 0 });

  if (datacrypto === undefined || dataicon === undefined)
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress />
      </div>
    );

  if (rows.length === 0) {
    setRows(datacrypto
      .filter(crypto => crypto['price_usd'] !== undefined && crypto['type_is_crypto'] === 1)
      .map((crypto) => {
        const iconurl = dataicon.find((e) => e['asset_id'] === crypto['asset_id']);

        return ({
          'icon': iconurl === undefined ? '' : iconurl['url'],
          'id': crypto['asset_id'],
          'name': crypto['name'] !== undefined ? crypto['name'] : crypto['asset_id'],
          'usdprice': crypto['price_usd'],
        });
      })
    );
  }

  return (
    <>
    {
      !logged &&
      <div style={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Logging handleLogging={setLogged} />
      </div>
    }
    {
      logged &&
      <>
        <TopBar />
        <div style={{
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <HelloUser />
          <CryptoList rows={rows} />
        </div>
      </>
    }
    </>
  );
}

export default Home;