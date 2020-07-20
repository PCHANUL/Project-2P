import React, {Component} from 'react';
import './App.css';
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import Nav from './Components/Nav/Nav'
import SelectRoom from './Pages/SelectRoom/SelectRoom'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Nav></Nav>
        <SelectRoom></SelectRoom>
        {/* <Signup></Signup>
        <Signin></Signin> */}
      </div>
    );

  }
}

export default App;
