import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { ArrowBack, ContactSupport, Menu } from '@material-ui/icons';

import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Mypage from './Mypage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // position: "fixed",
    // width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' className={classes.title}></Typography>
          {props.login.isLogin ? (
            <Button color='inherit' onClick={handleOpen}>
              Mypage
            </Button>
          ) : null}
          <Button color='inherit'>{props.login.isLogin ? 'Log Out' : 'Log In'}</Button>
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
