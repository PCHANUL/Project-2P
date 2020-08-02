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
  paper: {
    backgroundColor: 'transparent',
    
    width: theme.shadows[20],
    height: theme.shadows[20],
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
    height: '100vh',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
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

  let games = [
    {},{
      tag: <MoleGame />,
      color: '#00babd',
      pos: '170px',
      shadow: '1px 1px 100px 0px #00535c',
    }, {
      tag: <BDman />,
      color: '#000',
      pos: '90px',
      shadow: '-40px 0px 100px 0px #5c0200, 30px 0px 100px 0px #5e5d00',
      // shadow: '1px 1px 200px 0px #737373',
    }, {
      tag: <PongGame />,
      color: '#001',
      pos: '90px',
      shadow: '1px 1px 100px 0px #00535c',
    }
  ];

  return (
    <div className={classes.space} style={{ backgroundColor: games[cookie.load('selectedGame')]['color'] }}>
      <Paper className={classes.paper} style={{ 
        paddingTop: games[cookie.load('selectedGame')]['pos'],
        boxShadow: games[cookie.load('selectedGame')]['shadow'],
      }}>
        {
          games[cookie.load('selectedGame')]['tag']
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
