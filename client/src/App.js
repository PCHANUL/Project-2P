import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './Pages/Login/Login';
import SelectGame from './Pages/SelectGame/SelectGame';
import WaitingRoom from './containers/WaitingRoom';
import Nav from './containers/Nav';
import SelectRoom from './Pages/SelectRoom/SelectRoom';
import MakeGame from './Components/SelectRoom/MakeGame';

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
        </Switch>

        <Route path='/makegame'>
          <MakeGame />
        </Route>
      </div>
    );
  }
}

export default withRouter(App);
