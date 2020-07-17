import React, { Component } from 'react';
import Signin from '../../containers/Signin';
import Signup from '../../containers/Signup';

class Login extends Component {
  state = {
    openSignup: false,
  };
  render() {
    let signup = !this.state.openSignup ? (
      <div>
        <button onClick={() => this.setState({ openSignup: !this.state.openSignup })}>
          Sign Up
        </button>
      </div>
    ) : (
      <Signup />
    );

    return (
      <div>
        <Signin />
        {signup}
      </div>
    );
  }
}

export default Login;
