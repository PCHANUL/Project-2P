import React, { Component } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

class Signup extends Component {
  state = {
    open: false,
    username: '',
    password: '',
  };

  render() {
    return (
      <div style={{ marginTop: '15px' }}>
        <Button variant='outlined' color='primary' onClick={() => this.setState({ open: true })}>
          Sign Up to 2P!
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter your desired username and password</DialogContentText>
            <TextField
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              autoFocus
              margin='dense'
              id='name'
              label='Username'
              type='text'
              fullWidth
            />
            <TextField
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              autoFocus
              margin='dense'
              id='name'
              label='Password'
              type='text'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ open: false })} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.setState({ open: false });
                this.props.signup(this.state.username, this.state.password);
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
}

export default Signup;
