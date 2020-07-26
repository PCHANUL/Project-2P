import React from 'react';
import cookie from 'react-cookies'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { ArrowBack, ContactSupport, Menu } from '@material-ui/icons';

import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Mypage from './Mypage';

const axios = require('axios')

const signout = async() => {
  await logout()
  cookie.remove('username', {path:'/'})
  cookie.remove('avatarId', {path:'/'})
  window.location.reload()
}

const logout = async() => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/users/signout',
      withCredentials: true,
    })
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // position: "fixed",
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  window.addEventListener('keydown', (e) => {
    if(e.keyCode === 90 && e.ctrlKey){
      history.push('/')
    }
    if(e.keyCode === 88 && e.ctrlKey){
      history.push('/selectgame')
    }
    if(e.keyCode === 67 && e.ctrlKey){
      history.push('/selectroom')
    }
    if(e.keyCode === 86 && e.ctrlKey){
      history.push('/waitingroom')
    }
    if(e.keyCode === 66 && e.ctrlKey){
      history.push('/playgame')
    }
    if(e.keyCode === 116){
      console.log('awefawefawef')
    }
  })

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' className={classes.title}></Typography>
          {
            cookie.load('username')
            ? <div>
                <Button color='inherit' onClick={handleOpen}>
                  Mypage
                </Button>
                <Button
                color='inherit'
                onClick={() => {
                  signout();
                }}
                > Logout
                </Button>
              </div>
            : <Button
                color='inherit'
                onClick={() => {
                  history.push('/');
                }}
                >
                  Login
              </Button>
            }
          <IconButton color='inherit'>
            <ContactSupport />
          </IconButton>
          <Modal open={open} onClose={handleClose}>
            <Mypage></Mypage>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}
