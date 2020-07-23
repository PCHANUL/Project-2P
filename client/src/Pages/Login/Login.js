import React from 'react';
import Signin from '../../containers/Signin';
import Signup from '../../containers/Signup';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Typography, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    padding: theme.spacing(3),
    margin: theme.spacing(10),
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Paper className={classes.root} elevation={20}>
        <Grid container direction='row' justify='space-evenly' alignItems='center' spacing={5}>
          <Grid item>
            <Typography variant='h4'>Login</Typography>
          </Grid>
          <Grid item>
            <Signin />
            <Signup />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
