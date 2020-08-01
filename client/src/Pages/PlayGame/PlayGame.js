import React from 'react';
import { connect } from 'react-redux';
import PongGame from './PongGame';
import BDman from './BDman';
import MoleGame from './MoleGame';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import user1 from '../../images/avatar.png';
import user2 from '../../images/avatar2.png';
import { setRawCookie } from 'react-cookies';
import cookie from 'react-cookies'

const useStyles = makeStyles((theme) => ({
  Paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    width: 1000,
    height: 700,
    margin: theme.spacing(3, 3),
  },
  gameover: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: 500,
    height: 200,
    margin: theme.spacing(3, 3),
  },
  userCard: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    alignItems: 'center',
    width: 200,
    height: 240,
    margin: theme.spacing(3, 3),
  },
  space: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  user1: {
    height: 200,
    width: 200,
  },
  user2: {
    height: 200,
    width: 200,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // flexGrow: 1,
  },
}));

const PlayGame = ({ currentGame }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const screen = () => {
    let games = [<MoleGame />, <BDman />, <PongGame />];
    return games[cookie.load('selectedGame') - 1]
  }

  return (
    <div className={classes.space}>
      <Paper style={{ height: '1000px', backgroundColor: '#000' }}>
        {
          screen()
        }
      </Paper> 
    </div>
  );
};

function mapReduxStateToReactProps(state) {
  return {
    currentGame: state.currentGame.currentGame,
  };
}

export default connect(mapReduxStateToReactProps)(PlayGame);
