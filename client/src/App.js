import React, {Component} from 'react';
import './App.css';
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import Nav from './Components/Nav/Nav'
import SelectRoom from './Pages/SelectRoom/SelectRoom'
import MakeGame from './Components/SelectRoom/MakeGame'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <MakeGame />
        <Nav></Nav>
        <SelectRoom></SelectRoom>
      </div>
    );

  }
}

export default App;
