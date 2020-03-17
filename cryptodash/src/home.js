import React from 'react';

import useSWR from 'swr';

import store from './redux/store/index';
import { updateCrypto } from "./redux/actions/index";

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import TopBar from './TopBar/TopBar';
import CryptoList from './CryptoList/CryptoList';

function Home() {
  const [rows, setRows] = React.useState([]);

  const { data: datacrypto } = useSWR('https://rest.coinapi.io/v1/assets');
  const { data: dataicon } = useSWR('https://rest.coinapi.io/v1/assets/icons/16?', { refreshInterval: 0 });

  if (datacrypto === undefined || dataicon === undefined)
    return (<CircularProgress />);

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

  store.dispatch(updateCrypto(rows));

  return (
    <>
      <TopBar />
      <div style={{ padding: 20 }}>
        <Grid container justify="center" spacing={5} direction="column">
          <Grid item>
            <CryptoList rows={rows} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;