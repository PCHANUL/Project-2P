import React, {Component} from 'react';
import './App.css';
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import Nav from './Components/Nav/Nav'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Nav></Nav>
        <Signup></Signup>
        <Signin></Signin>
      </div>
    );

  }
}

export default App;
