import React, { forwardRef, useState } from 'react';

import {
  CryptoListContainer,
  CryptoListTableContainer,
  CryptoListModalContent,
} from './CryptoListStyle';

import store from "../redux/store/index";
import {
  addSubscription,
} from "../redux/actions/index";

import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
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

function CryptoListDetail({ rowData, closeModal, forwardRef }) {
  const [price, setPrice] = useState('');

  const _handleChange = e => setPrice(e.target.value);
  const _handleClick = () => {
    const payload = {
      crypto: rowData.name,
      price: price,
      active: true,
    }
    store.dispatch(addSubscription(payload));
    closeModal(false);
  }

  return (
    <div style={{ position: 'absolute', top: '50', left: '50' }}>
      <Card>
        <form>
          <CryptoListModalContent>
            <CardContent>
              Notify me when {rowData.name} drops under
            </CardContent>
            <CardContent>
              <Input
                id="standard-adornment-amount"
                value={price}
                onChange={_handleChange}
                type='number'
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </CardContent>
            <CardContent>
              <Button variant="contained" onClick={() => _handleClick()}>Keep me updated</Button>
            </CardContent>
          </CryptoListModalContent>
        </form>
      </Card>
    </div>
  )
}

function CryptoListTable({ rows }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(undefined);

  const _handleClick = (rowData) => {
    setSelected(rowData);
    setOpen(!open);
  }

  return (
    <>
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
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'USD price', field: 'usdprice', type: 'numeric' },
          ]}
          data={rows}
          icons={tableIcons}
          options={{
            pageSize: 5,
            pageSizeOptions: [0],
          }}
          onRowClick={(event, rowData) => _handleClick(rowData)}
        />
      </CryptoListTableContainer>
      <Modal
        open={open}
        onClose={_handleClick}
      >
        <CryptoListDetail rowData={selected} closeModal={_handleClick} />
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