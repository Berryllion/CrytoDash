import React, { forwardRef, useState } from 'react';

import {
  CryptoListContainer,
  CryptoListTableContainer,
  CryptoListModalContent,
  CryptoListCryptoName,
  CryptoListInputError,
} from './CryptoListStyle';

import store from "../redux/store/index";
import {
  addSubscription,
  updateCrypto,
} from "../redux/actions/index";

import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CryptoListDetail = React.forwardRef(({
  rowData,
  closeModal,
  setSubscribed,
  setSubscribedError
}, ref) => {
  const [usdprice, setUsdPrice] = useState('');
  const [error, setError] = useState(false);

  const _handleChange = e => {
    if (e.target.value !== '') {
      setError(false);
    }
    setUsdPrice(e.target.value);
  };
  const _handleClick = () => {
    if (usdprice === '') {
      setError(true);
      return;
    }

    if (store.getState()['subscriptions'].find(e => e.crypto === rowData.name)) {
      setSubscribedError(true);
      closeModal(false);
      return;
    }

    const payload = {
      crypto: rowData.name,
      usdprice: parseFloat(usdprice),
      active: true,
      sent: false,
    }
    store.dispatch(addSubscription(payload));
    closeModal(false);
    setSubscribed(true);
  }

  return (

      <Card>
        <CryptoListModalContent>
          <CardContent>
            Notify me when
            <CryptoListCryptoName color='#007aa5'>{rowData.name}</CryptoListCryptoName>
            drops under:
          </CardContent>
          <CardContent>
            <Input
              id='standard-adornment-amount'
              value={usdprice}
              onChange={_handleChange}
              type='number'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              error={error}
            />
            {error && <CryptoListInputError>Please enter a usdprice.</CryptoListInputError>}
          </CardContent>
          <CardContent>
            <Button
              variant='contained'
              onClick={_handleClick}
              color='primary'
            >
              Keep me updated
            </Button>
          </CardContent>
        </CryptoListModalContent>
      </Card>
  )
});

function CryptoListTable({ rows }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedError, setSubscribedError] = useState(false);

  store.dispatch(updateCrypto(rows));

  const _handleClick = (rowData) => {
    setSelected(rowData);
    setOpen(!open);
  }

  const _handleSnack = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSubscribed(false);
    setSubscribedError(false);
  };

  return (
    <>
      <Snackbar open={subscribed} autoHideDuration={6000} onClose={_handleSnack}>
        <Alert onClose={_handleSnack} severity="success">
          Successfully subscribed!
        </Alert>
      </Snackbar>
      <Snackbar open={subscribedError} autoHideDuration={6000} onClose={_handleSnack}>
        <Alert onClose={_handleSnack} severity="warning">
          You are already subscribed to this cryptocurrency.
        </Alert>
      </Snackbar>
      <CryptoListTableContainer>
        <MaterialTable
          title="Cryptocurrencies"
          columns={[
            {
              title: 'Icon', field: 'icon', sorting: false, render: rowData => (
                rowData.icon ? <img src={rowData.icon} alt='icon' /> : ''
              ),
              cellStyle: { width: '100px' },
            },
            { title: 'ID', field: 'id', defaultSort: 'asc' },
            { title: 'Name', field: 'name' },
            { title: 'USD usdprice', field: 'usdprice', type: 'numeric'},
          ]}
          data={rows}
          icons={tableIcons}
          options={{
            pageSize: 6,
            pageSizeOptions: [0],
          }}
          onRowClick={(e, rowData) => _handleClick(rowData)}
        />
      </CryptoListTableContainer>
      <Modal
        open={open}
        onClose={_handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CryptoListDetail
          rowData={selected}
          closeModal={_handleClick}
          setSubscribed={setSubscribed}
          setSubscribedError={setSubscribedError}
        />
      </Modal>
    </>
  );
}

function CryptoList({ rows }) {
  return (
    <CryptoListContainer>
      <CryptoListTable rows={rows} />
    </CryptoListContainer>
  );
}

export default CryptoList;