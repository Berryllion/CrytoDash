import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TopBar from './topbar.js';
import CryptoList from './cryptoinfo/crypolist.js';
import FavoriteCrypto from './cryptoinfo/favcrypto.js';

const useStyles= makeStyles({
  stickBottom: {
    width: '100%',
    margin: '0',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

function Home() {
  const classes = useStyles();

  return (
    <>
      <TopBar />
      <div style={{ padding: 20 }}>
        <Grid container justify="center" spacing={5} direction="column">
          <Grid item>
          <FavoriteCrypto />
          </Grid>
          <Grid item>
            <div className={classes.stickBottom}>
              <CryptoList />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;