import React from 'react';
import GameList from '../../containers/GameList';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import cookie from 'react-cookies'

import WhackAMole from '../../Components/GameList/img/WhackAMole.jpg';
import Pong from '../../Components/GameList/img/Pong.jpg';
import FlipCard from '../../Components/GameList/img/FlipCard2.jpeg';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  flexContainer: {
    margin: theme.spacing(2),
  }
}))

const SelectGame = ({ isLogin }) => {
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    if(!cookie.load('username')){
      history.push('/')
    }
  })


  return (
      <Grid container direction="column" justify="space-evenly" alignItems="center">
        <Grid container direction="row" justify="space-evenly" alignItems="center" >
          <Grid item style={{margin: '25px'}}>
            <GameList image={WhackAMole} gameName='WhackAMole' />
          </Grid>
          <Grid item style={{margin: '25px'}}>
            <GameList image={Pong} gameName='Pong' />
          </Grid>
        </Grid>
        <Grid item style={{margin: '25px'}}>
          <GameList image={FlipCard} gameName='FlipCard' />
        </Grid>
      </Grid>
  );
};

function mapReduxStateToReactProps(state) {
  return {
    isLogin: state.login.isLogin
  }
}

export default connect(mapReduxStateToReactProps)(SelectGame);
