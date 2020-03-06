import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CryptoListTable from './table/tablebody.js';

const useStyles = makeStyles({
  content: {
    padding: '20',
    textAlign: 'center',
  },
});


function CryptoList() {
  const classes = useStyles();

  return(
    <div className={classes.content}>
      <CryptoListTable />
    </div>
  );
}

export default CryptoList;