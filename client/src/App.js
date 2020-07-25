import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login/Login';
import SelectGame from './Pages/SelectGame/SelectGame';
import WaitingRoom from './Pages/WaitingRoom/WaitingRoom';
import Nav from './containers/Nav';
import SelectRoom from './Pages/SelectRoom/SelectRoom';
import MakeGame from './containers/MakeGame';
import PlayGame from './Pages/PlayGame/PlayGame';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/selectgame'>
            <SelectGame />
          </Route>
          <Route path='/selectroom'>
            <SelectRoom />
          </Route>
          <Route path='/waitingroom'>
            <WaitingRoom />
          </Route>
          <Route path='/playgame'>
            <PlayGame />
          </Route>
        </Switch>

        <MakeGame />
      </div>
    );
  }
}

export default withRouter(App);
