import React from 'react';
import Signin from '../../containers/Signin';
import Signup from '../../containers/Signup';
import { makeStyles } from '@material-ui/core/styles';

import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import {
  Button,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 300,
    padding: theme.spacing(3),
    margin: theme.spacing(10),
  },
  rootButton: {
    width: 200,
  },
}))


const Login = ({ socialLogin }) => {
  const classes = useStyles()
  
  // 구글 로그인 응답함수
  function responseGoogle  (response) {
    console.log(response.Pt.zu)
    console.log(response.Pt.Cd);
    console.log(response.googleId);
    socialLogin(response.Pt.zu, response.googleId, `Google_${response.Pt.Cd}`)
    
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.root} elevation={20} >
        <Grid container direction="column" justify="space-evenly" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant='h4'>
              Login
            </Typography>
          </Grid>
          <Grid item>
            <Signin />
          </Grid>
            <Grid container direction="column" justify="space-evenly" alignItems="center" spacing={1}>
              <Grid item>
                <Signup />
              </Grid>
              <Grid item>
                <GoogleLogin
                  clientId="586428782508-irgaffmopubuvtbppdjnrvtat0nc9lb2.apps.googleusercontent.com"
                  render={renderProps => (
                    <Button variant='contained' 
                      color='primary' 
                      className={classes.rootButton} 
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                      Google Login
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  style={{width: 200}}
                />
              </Grid>
            </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
