import React, { Component } from 'react';
import { Button, TextField, InputAdornment } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <form>
        <div>
          <TextField
            id='input-with-icon-textfield'
            label='Username'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>
        <div>
          <TextField
            id='input-with-icon-textfield'
            label='Password'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
          <Button variant='contained' color='primary' onClick={() => console.log(123)}>
            Sign In
          </Button>
        </div>
      </form>
    );
  }
}

export default Signin;
