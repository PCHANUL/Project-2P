import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
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

import * as actionTypes from '../../store/actions';
import RoomList from '../../Components/SelectRoom/RoomList';

const axios = require('axios')

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

function SelectRoom({ login, roomList, getRooms, makeRooms, isMaking }) {
  const classes = useStyles();
  const history = useHistory();
  const [currentGame, selectedGame] = React.useState(0);
  const [rooms, getRoomList] = React.useState([{}]);

  React.useEffect(() => {
    if (!cookie.load('username')) {
      history.push('/');
    } else if (!cookie.load('selectedGame')) {
      history.push('/selectgame')
    } else if (cookie.load('selectedRoom')){
      history.push('/waitingroom')
    }

    // 새로운 방이 생성되기 전까지 실행
    if(rooms[0] === undefined){  
      getRooms()
    }
    selectedGame(Number(cookie.load('selectedGame')))
    getRoomList(roomList);
  });

  const handleChange = (event, newValue) => {
    selectedGame(newValue);
    cookie.save('selectedGame', newValue, { path: '/' })
  };

  let emptyRoomList = (
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
  )

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={currentGame}
          onChange={handleChange}
          onClick={getRooms}
          indicatorColor='primary'
          textColor='primary'
          centered
        >
          <Tab label='Game one' />
          <Tab label='Game Two' />
          <Tab label='Game Three' />
        </Tabs>
      </Paper>
      {
        rooms[0] === undefined
        ?  emptyRoomList
        : (
        <div>
          <div className={classes.section1}>
            {rooms.map((room, idx) => (
              <RoomList
                key={idx}
                roomName={room.roomName}
                isWait={room.isWait}
                isLocked={room.isLocked}
                isFull={room.isFull}
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
    login: state.login,
  };
};

const mapReduxDispatchToReactProps = (dispatch) => {
  return {
    getRooms: async function () {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/rooms/roomlist',
          withCredentials: true,
        })
        dispatch({ type: 'GET_ROOMS', payload: response.data });
      } catch (err) {
        console.log(err)
      }
    },
    makeRooms: function () {
      dispatch({ type: 'MAKE_ROOM' });
    },
  };
};

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(SelectRoom);
