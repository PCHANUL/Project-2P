import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';

import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // width: 300,
  },
  button: {
    margin: theme.spacing(2,2,0,0)
  },
  closeButton: {
    margin: theme.spacing(10, 5)
  }
}));

export default function MakeGame({ isMaking, makeRoomsClose }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  React.useEffect(() => {
    setOpen(isMaking)
  },[])
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange1 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Grid item container direction="row" justify="center" alignItems="center">
                <Grid item xs>
                  <h2 id="transition-modal-title">방만들기</h2>
                </Grid>
                <Grid>
                  <IconButton aria-label="취소">
                    <CancelIcon onClick={ () => makeRoomsClose() }/>
                  </IconButton>
                </Grid>
            </Grid>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-helper">Game</InputLabel>
              <NativeSelect
                value={state.age}
                onChange={handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-native-helper',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>두더지게임</option>
                <option value={20}>타일맞추기</option>
                <option value={30}>핑퐁게임</option>
              </NativeSelect>
              
            </FormControl>
            <div>
            <TextField id="standard-basic" label="Room name" />
            </div>
            <div>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange1('password')}
                endAdornment={
                  <InputAdornment position="end">
                      {values.password ? <LockIcon /> : <LockOpenIcon />}
                  </InputAdornment>
                }
                />
                <FormHelperText>비밀방을 생성할 때 입력해주세요</FormHelperText>
            </FormControl>
            </div>
            <div className={classes.button}>
            {
              values.password 
              ? <Button variant="contained" color="primary">
                  비공개방 생성
                </Button>
              : <Button variant="contained">공개방 생성</Button>
            }
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
