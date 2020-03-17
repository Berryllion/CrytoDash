import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import {
  LoggingContainer,
  LoggingElement,
  LoggingInputError
} from './LoggingStyle';

import store from "../redux/store/index";
import {
  logUser,
} from "../redux/actions/index";

function Logging({ handleLogging }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const _checkEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const _handleChangeUsername = e => {
    setUsername(e.target.value);
    setErrorUsername(false);
  }
  const _handleChangeEmail = e => {
    if (_checkEmail(e.target.value)) {
      setEmail(e.target.value);
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  }
  const _handleClick = () => {
    if (username === '') {
      setErrorUsername(true);
      return;
    }
    if (email === '') {
      setErrorEmail(true);
      return;
    }

    const payload = {
      username: username,
      email: email,
    }
    store.dispatch(logUser(payload));
    handleLogging(true);
  }

  return (
    <Card>
      <LoggingContainer>
        <LoggingElement>
          <TextField
            id='username'
            label='Username'
            onChange={_handleChangeUsername}
            error={errorUsername}
          />
          {errorUsername && <LoggingInputError>Pleaser enter a username.</LoggingInputError>}
        </LoggingElement>
        <LoggingElement>
          <TextField
            type='email'
            id='email'
            label='Email'
            onChange={_handleChangeEmail}
            error={errorEmail}
          />
          {errorEmail && <LoggingInputError>Pleaser enter a valid email.</LoggingInputError> }
        </LoggingElement>
        <LoggingElement button>
          <Button
            variant='contained'
            onClick={_handleClick}
            color='primary'
            >
            Log in
          </Button>
        </LoggingElement>
      </LoggingContainer>
    </Card>
  )
}

export default Logging;
