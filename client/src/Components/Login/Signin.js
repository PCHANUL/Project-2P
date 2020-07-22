import React, { Component } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

class Signin extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidUpdate() {
    if (this.props.login.isLogin === true) {
      this.props.history.push('/selectgame');
    }
  }

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
            type="password"
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
          <Button
            variant='contained'
            color='primary'
            onClick={
              () => this.props.signin()
              // () => this.props.history.push('/selectgame')
            }
          >
            Sign In
          </Button>
        </div>
      </form>
    );
  }
}

export default withRouter(Signin);
