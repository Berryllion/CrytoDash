
import React, { useState } from 'react';

import { connect } from "react-redux";
import store from "../redux/store/index";
import {
  removeSubscription,
  updateSubscription,
} from "../redux/actions/index";

import {
  TopBarContainer,
  TopBarDrawerEmpty,
  TopBarDrawerEditContainer,
  TopBarDrawerEdit,
  TopBarDrawerPrice,
} from './TopBarStyle';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  list: {
    width: '350px',
  },
  listText: {
    color: '#007aa5',
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      fontSize: '1.1em',
    }
  }
}));

function SubscriptionsDrawerItem({ info, i }) {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [checked, setChecked] = useState(info['active']);

  const currentCryptoPrice = store.getState()['cryptocurrencies']
    .find(e => e['name'] === info['crypto'])['usdprice']
  const currentCryptoId = store.getState()['cryptocurrencies']
    .find(e => e['name'] === info['crypto'])['id']

  const _priceEdit = e => {
    setNewPrice(e.target.value);
  }

  const _notificationEdit = e => {
    setChecked(!checked);
    const payload = { ...info, active: !checked, sent: false }
    store.dispatch(updateSubscription(payload));
  }

  return (
    <>
      <ListItem button key={i.toString()}>
        <ListItemText className={classes.listText} primary={currentCryptoId} />
        <TopBarDrawerPrice>
          {currentCryptoPrice.toFixed(3)} $USD
        </TopBarDrawerPrice>
        <IconButton onClick={() => setEdit(!edit)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => {
          const payload = info;
          store.dispatch(removeSubscription(payload));
        }}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      {
        edit &&
        <TopBarDrawerEditContainer>
          <TopBarDrawerEdit>
            Price limit set: {info['usdprice']} $USD.
          </TopBarDrawerEdit>
          <TopBarDrawerEdit>
            <Input
              id='standard-adornment-amount'
              value={newPrice}
              onChange={_priceEdit}
              type='number'
              startAdornment={<InputAdornment position="start">New price</InputAdornment>}
            />
            <IconButton onClick={() => {
              const payload = { ...info, usdprice: parseFloat(newPrice) }
              store.dispatch(updateSubscription(payload));
              setNewPrice('');
              setEdit(false);
            }}>
              <SendIcon fontSize="small" />
            </IconButton>
          </TopBarDrawerEdit>
          <TopBarDrawerEdit>
            <FormControlLabel
              control={
                <Switch
                  size='small'
                  checked={checked}
                  onChange={_notificationEdit}
                  value='edit-notification'
                  color='primary'
                />
              }
              label="Send alert"
            />
          </TopBarDrawerEdit>
        </TopBarDrawerEditContainer>
      }
    </>
  );
}

const mapStateToProps = state => {
  return { subscriptions: state.subscriptions };
};

const SubscriptionsDrawerComponent = ({ subscriptions }) => {
  const classes = useStyles();

  if (subscriptions.length === 0) {
    return (
      <TopBarDrawerEmpty>
        No cryptocurrency followed at the moment
      </TopBarDrawerEmpty>
    );
  }

  return (
    <div
      role="presentation"
      className={classes.list}
    >
      <List>
        {
          subscriptions.map((e, i) =>
            <SubscriptionsDrawerItem key={i.toString()} info={e} i={i} />
          )
        }
      </List>
    </div>
  )
}

const SubscriptionsDrawer = connect(mapStateToProps)(SubscriptionsDrawerComponent);

function TopBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const _toggleDrawer = open => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  }

  return (
    <>
      <TopBarContainer>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={_toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              CryptoDash
            </Typography>
          </Toolbar>
        </AppBar>
      </TopBarContainer>
      <Drawer open={drawerOpen} onClose={_toggleDrawer(false)}>
        <SubscriptionsDrawer />
      </Drawer>
    </>
  );
}

export default TopBar;