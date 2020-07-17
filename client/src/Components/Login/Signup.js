import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class Signup extends Component {
  state = {
    username: '',
    password: '',
  };
  render() {
    return (
      <form>
        <div>
          <span>Username</span>
          <input
            type='text'
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
        </div>
        <div>
          <span>password</span>
          <input
            type='password'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div>
          <button>GOOGLE LOGIN</button>
        </div>
        <div>
          <Button variant='contained' color='primary' onClick={() => console.log(123)}>
            Sign Up
          </Button>
        </div>
      </form>
    );
  }
}

export default Signup;
