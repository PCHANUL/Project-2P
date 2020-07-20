import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ReadyBtn from '../ReadyBtn';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 15,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Users() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          플레이어 아이콘
        </Typography>
        <Typography className={classes.pos} variant='h5' component='h2'>
          플레이어 이름
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          현재 게임 승/패
        </Typography>
      </CardContent>
      <ReadyBtn />
    </Card>
  );
}
