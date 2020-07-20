import React, { Component } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import SelectGame from './Pages/SelectGame/SelectGame';
import WaitingRoom from './Pages/WaitingRoom/WaitingRoom';

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <Login />
        <SelectGame /> */}
        <WaitingRoom />
      </div>
    );
  }
}

export default App;
