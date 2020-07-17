import React, { Component } from 'react';
import './App.css';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Login from './Pages/Login/Login';
import GameList from './Components/GameList/GameList';

import WhackAMole from './Components/GameList/img/WhackAMole.jpg';
import Pong from './Components/GameList/img/Pong.jpg';
import FlipCard from './Components/GameList/img/FlipCard.png';

const flexContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '100px auto',
};

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Login />
        <div style={flexContainer}>
          <GameList image={WhackAMole} gameName='WhackAMole' />
          <GameList image={Pong} gameName='Pong' />
          <GameList image={FlipCard} gameName='FlipCard' />
        </div>
      </div>
    );
  }
}

export default App;
