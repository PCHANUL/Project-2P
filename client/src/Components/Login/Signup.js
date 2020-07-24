import React, { Component } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';



  const useStyles = makeStyles((theme) => ({
    rootButton: {
      width: 200
    }
  }))


  const Signup = ({ signup }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [username, inputUsername] = React.useState('');
    const [nickname, inputNickname] = React.useState('');
    const [password, inputPassword] = React.useState('');


    return (
      <div style={{ marginTop: '15px' }}>
        <Button variant='outlined' color='primary' className={classes.rootButton} onClick={() => setOpen(true)}>
          Sign Up to 2P!
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(true)}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter your desired username and password</DialogContentText>
            <TextField
              value={username}
              onChange={(e) => inputUsername(e.target.value)}
              autoFocus
              margin='dense'
              id='name'
              label='Username'
              type='text'
              fullWidth
            />
            <TextField
              value={nickname}
              onChange={(e) => inputNickname(e.target.value)}
              autoFocus
              margin='dense'
              id='name'
              label='nickname'
              type='text'
              fullWidth
            />
            <TextField
              value={password}
              onChange={(e) => inputPassword(e.target.value)}
              autoFocus
              margin='dense'
              id='name'
              label='Password'
              type='password'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                signup(username, nickname, password);
                // signup 성공시 history.push('/selectGame') 이동하게 콜백 넘겨주기
                // 실패시 콜백으로 localhost:3000 창과 함께 실패했습니다 모달 창 띄워주기
              }}
              color='primary'
            >
              Sign up & log in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


export default Signup;
