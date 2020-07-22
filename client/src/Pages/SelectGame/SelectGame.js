import React from 'react';
import GameList from '../../containers/GameList';

import WhackAMole from '../../Components/GameList/img/WhackAMole.jpg';
import Pong from '../../Components/GameList/img/Pong.jpg';
import FlipCard from '../../Components/GameList/img/FlipCard2.jpeg';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const userStyles = makeStyles((theme) => ({
  flexContainer: {
    margin: theme.spacing(2),
  }
}))

const SelectGame = () => {
  const classes = userStyles();

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

export default SelectGame;
