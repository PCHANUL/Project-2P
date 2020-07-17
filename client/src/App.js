import React, {Component} from 'react';
import './App.css';
import Signin from './containers/Signin'
import Signup from './containers/Signup'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Signup></Signup>
        <Signin></Signin>
      </div>
    );

  }
}

export default App;
