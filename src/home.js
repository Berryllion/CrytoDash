import React, { useEffect, useState } from 'react';

import useSWR from 'swr';

import emailjs from 'emailjs-com';

import store from './redux/store/index';
import { updateSubscription } from "./redux/actions/index";

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import TopBar from './TopBar/TopBar';
import CryptoList from './CryptoList/CryptoList';
import Logging from './Logging/Logging';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [rows, setRows] = useState([]);
  const [logged, setLogged] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [conditionMet, setConditionMet] = useState({
    name: '',
    usdprice: 0,
    valid: false
  });

  const { data: datacrypto } = useSWR('https://rest.coinapi.io/v1/assets');
  const { data: dataicon } = useSWR('https://rest.coinapi.io/v1/assets/icons/16?', { refreshInterval: 0 });

  const _handleSnack = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEmailError(false);
    setConditionMet({
      name: '',
      usdprice: 0,
      valid: false
    });
  };

  const _sendEmail = (info) => {
    const emailInfo = {
      'email': store.getState()['email'],
      'username': store.getState()['username'],
      'crypto': info['crypto'],
      'usdprice': info['usdprice'],
    };

    emailjs.send('outlook', 'subscribed', emailInfo, 'user_SSYB1IwzGR82K5uL1afQH')
    .then((response) => {
      setConditionMet({
        name: info['crypto'],
        usdprice: info['usdprice'],
        valid: true
      });
    }, (err) => {
      setEmailError(true);
    });
  }

  useEffect(() => {
    if (datacrypto !== undefined && dataicon !== undefined) {
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
      )
    }
  }, [datacrypto, dataicon]);

  useEffect(() => {
    if (rows.length !== 0) {
      store.getState()['subscriptions'].map((subscription) => {
        const match = rows.find(e => subscription['crypto'] === e['name']);

        if (subscription['active'] && !subscription['sent'] &&
        (match['usdprice'] <= subscription['usdprice'])) {
          const payload = { ...subscription, sent: true }
          store.dispatch(updateSubscription(payload));
          _sendEmail(subscription);
        }
        return true
      })
    }
  }, [rows]);

  if (datacrypto === undefined || dataicon === undefined) {
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
          <Snackbar open={conditionMet['valid']} autoHideDuration={6000} onClose={_handleSnack}>
            <Alert onClose={_handleSnack} severity='info'>
              {
                conditionMet['name'] + ' has dropped under ' + conditionMet['usdprice'] + ' US$.'
              }
            </Alert>
          </Snackbar>
          <Snackbar open={emailError} autoHideDuration={6000} onClose={_handleSnack}>
            <Alert onClose={_handleSnack} severity='error'>
              Couldn't send email.
            </Alert>
          </Snackbar>
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