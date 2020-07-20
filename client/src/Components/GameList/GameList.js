import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, useHistory } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
});

const gameDescription = {
  WhackAMole: '두더지를 잡아라!',
  Pong: '핑핑핑퐁퐁퐁',
  FlipCard: '사천성! 같은 카드를 뒤집어라!',
};

const GameList = (props) => {
  const { image, gameName } = props;
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='gameImg'
          height='140'
          image={image}
          title={`${gameName} game`}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {gameName}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {gameDescription[gameName]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            props.selectGame(gameName);
            history.push('/selectroom');
          }}
        >
          게임 하기!
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(GameList);
