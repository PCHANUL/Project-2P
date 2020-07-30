import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import congratulations from './img/congratulations.png';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    maxHeigh: 350,
    opacity: 0.97,
    zIndex: 100,
    position: 'fixed',
    background: '#757ce8',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

function Gameover({ winner }) {
  const classes = useStyles();
  const history = useHistory();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer < 0) {
      return history.push('/waitingRoom');
    }
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }, [timer]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={congratulations}
          title='Contemplative Reptile'
        />
        <CardContent className={classes.box}>
          <Typography gutterBottom variant='h3' component='h2'>
            {winner === 'tie' ? '무승부' : `${winner} 승리!`}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='h2' variant='h5'>
            {timer}초 후 대기방으로 이동합니다.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withRouter(Gameover);
