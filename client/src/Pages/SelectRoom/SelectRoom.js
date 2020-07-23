import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import RoomList from '../../Components/SelectRoom/RoomList';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RefreshIcon from '@material-ui/icons/Refresh';
import { Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

let rows = [];

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  refresh: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(11),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  emptyAlert: {
    width: '700px',
    height: '700px',
  },
  alertText: {
    margin: theme.spacing(30, 0, 10, 0),
  },
}));

function SelectRoom({ login, roomList, getRooms, makeRooms, isMaking, changeCurrentGame }) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [rows, getRows] = React.useState([{}]);

  React.useEffect(() => {
    // 대기방이 없는 경우 계속 요청을 보낸다.
    if (roomList.length === 0) {
      getRooms();
    }
    getRows(roomList);

    console.log(rows);
    console.log(isMaking);
  }, []);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    changeCurrentGame(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='Game one' />
          <Tab label='Game Two' />
          <Tab label='Game Three' />
        </Tabs>
      </Paper>

      {rows.length === 0 ? (
        <Grid
          container
          container
          direction='column'
          justify='space-evenly'
          alignItems='center'
          className={classes.section1}
        >
          <Paper className={classes.emptyAlert}>
            <Grid item>
              <Typography variant='h4' className={classes.alertText}>
                대기중인 방이 없습니다.
                <br />
                방을 생성해보세요
              </Typography>
            </Grid>
            <Grid container direction='row' justify='space-evenly' alignItems='center'>
              <Tooltip
                title='방만들기'
                aria-label='add'
                onClick={() => {
                  makeRooms();
                }}
              >
                <Fab color='secondary'>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip
                title='새로고침'
                aria-label='add'
                onClick={() => {
                  getRooms();
                }}
              >
                <Fab color='primary'>
                  <RefreshIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Paper>
        </Grid>
      ) : (
        <div>
          <div className={classes.section1}>
            {rows.map((row) => (
              <RoomList
                roomName={row.roomName}
                isWait={row.isWait}
                isLocked={row.isLocked}
                isFull={row.isFull}
                login={login}
              />
            ))}
          </div>
          <Tooltip
            title='방만들기'
            aria-label='add'
            onClick={() => {
              makeRooms();
            }}
          >
            <Fab color='secondary' className={classes.absolute}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip
            title='새로고침'
            aria-label='add'
            onClick={() => {
              getRooms();
            }}
          >
            <Fab color='primary' className={classes.refresh}>
              <RefreshIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

const mapReduxStateToReactProps = (state) => {
  return {
    roomList: state.selectedRoom.roomList,
    isMaking: state.selectedRoom.isMaking,
    currentGame: state.selectedRoom.currentGame,
    login: state.login,
  };
};

const mapReduxDispatchToReactProps = (dispatch) => {
  return {
    getRooms: function () {
      dispatch({ type: 'GET_ROOMS' });
    },
    makeRooms: function () {
      dispatch({ type: 'MAKE_ROOM' });
    },
    changeCurrentGame: function (currentGame) {
      dispatch({ type: 'SELECT_GAME', payload: currentGame + 1 });
    },
  };
};

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(SelectRoom);
