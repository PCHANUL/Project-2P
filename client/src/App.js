import React, { Component } from 'react';
import './App.css';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Login from './Pages/Login/Login';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Login />
      </div>
    );
  }
}

export default App;
