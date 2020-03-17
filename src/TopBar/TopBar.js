
import React, { useState } from 'react';

import { connect } from "react-redux";

import {
  TopBarContainer,
  TopBarDrawerEmpty,
} from './TopBarStyle';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
    width: 250,
  },
}));

function TopBar() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const _toggleDrawer = open => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  }

  const mapStateToProps = state => {
    return { subscriptions: state.subscriptions };
  };

  const SubscriptionsDrawerComponent = ({ subscriptions }) => {
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
        onClick={_toggleDrawer(false)}
        onKeyDown={_toggleDrawer(false)}
        className={classes.list}
      >
        <List>
          {
            subscriptions.map((e, i) =>
              <ListItem button key={i.toString()}>
                <ListItemText primary={e.crypto} />
              </ListItem>
            )
          }
        </List>
      </div>
    )
  }

  const SubscriptionsDrawer = connect(mapStateToProps)(SubscriptionsDrawerComponent);

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