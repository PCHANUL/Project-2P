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
  Popover,
  Paper,
  Grow,
  Grid,
} from '@material-ui/core';
import SelectGame from '../../Pages/SelectGame/SelectGame';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    // margin: 'auto',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  mouseOverPaper: {
    width: '600px',
    height: '300px',
  },
  button: {
    width: '200px',
    height: '200px',
    margin: theme.spacing(1)
  },
}));

const gameDescription = {
  WhackAMole: {
    desc: '두더지를 잡아라!',
    code: 1,
  },
  Pong: {
    desc: '핑핑핑퐁퐁퐁',
    code: 2,
  },
  FlipCard: {
    desc: '사천성! 같은 카드를 뒤집어라!',
    code: 3,
  },
};

const GameList = ({ image, gameName, getRooms, selectGame }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);


  return (
    <Card className={classes.root}>
      {
        open
        ? 
        <Grow in={open}>
          <Paper 
            elevation={4}
            className={classes.mouseOverPaper}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <Typography variant='h3'>
              {gameName}
            </Typography>
            <Typography variant='body' color='textSecondary' component='p'>
              {gameDescription[gameName]['desc']}
            </Typography>
            <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={3}>
              <Grid item>
                <Button color="primary" disableElevation className={classes.button} variant="outlined" onClick={() => {
                  getRooms()
                  selectGame(gameDescription[gameName]['code'])
                  history.push('/selectroom')
                }}>
                  <Typography variant='h6'>
                    참가하기
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button color="secondary" disableElevation className={classes.button} variant="outlined">
                  <Typography variant='h6'>
                    방 만들기
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grow>
        :
        <CardMedia
          component='img'
          alt='gameImg'
          height='300'
          image={image}
          title={`${gameName} game`}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
      }
    </Card>

      //   {/* <CardContent>
      //     <Typography gutterBottom variant='h5' component='h2'>
      //       {gameName}
      //     </Typography>
      //     <Typography variant='body2' color='textSecondary' component='p'>
      //       {gameDescription[gameName]}
      //     </Typography>
      //   </CardContent> */}
      
      // {/* <CardActions> */}
      //   {/* <Button size='small' color='primary' onClick={() => {
      //     getRooms()
      //     history.push('/selectroom')
      //   }}>
      //     게임 하기!
      //   </Button> */}
      // {/* </CardActions> */}
    
  );
};

export default withRouter(GameList);
