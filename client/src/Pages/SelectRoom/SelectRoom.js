import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cookie from 'react-cookies';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Typography, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import * as actionTypes from '../../store/actions';
import RoomList from '../../Components/SelectRoom/RoomList';

const axios = require('axios')

const styles = (theme) => ({
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
    width: theme.spacing(80),
    height: theme.spacing(70),
  },
  alertText: {
    margin: theme.spacing(20, 0, 10, 0),
  },
  root: {
    padding: theme.spacing(8, 0, 0, 0),
  }
});

class SelectRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: 0,
      rooms: [],
    }
  }

  componentDidMount(){
    if (!cookie.load('username')) {
      this.props.history.push('/');
    } else if (!cookie.load('selectedGame')) {
      this.props.history.push('/selectgame')
    } else if (cookie.load('selectedRoom')){
      this.props.history.push('/waitingroom')
    }
    
    this.setState({ currentGame: Number(cookie.load('selectedGame')) })
    
    // 새로운 방이 생성되기 전까지 실행
    if(this.state.rooms[0] === undefined){  
      this.interval()
    }
  }

  componentWillUnmount(){
    clearInterval(this.getRoom)
  }

  interval() {
    this.getRoom = setInterval(async() => {
      await this.props.getRooms()
      console.log('-----------')
      if(this.props.roomList[0]){
        this.setState({ rooms: [...this.props.roomList]})
        clearInterval(this.getRoom)
      }
    }, 2500);
  }



  handleChange = (event, newValue) => {
    cookie.save('selectedGame', newValue, { path: '/' });
    this.setState({ currentGame: newValue });
    this.setState({ rooms: [] })
    this.interval()
  };
  
  render() {
    const { classes } = this.props;
    
    console.log(this.state.currentGame)

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.currentGame}
            onChange={this.handleChange}
            onClick={this.props.getRooms}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='게임 설명' />
            <Tab label='두더지 게임' />
            <Tab label='구슬 동자' />
            <Tab label='숫자 야구' />
          </Tabs>
        </Paper>
        {
          cookie.load('selectedGame') === '0'
          ? <div>게임설명</div>
          : this.state.rooms[0] === undefined  // 생성된 방이 없다
            ? <Grid container direction='column' justify='space-evenly' alignItems='center' className={this.props.classes.section1}>
                <Paper className={this.props.classes.emptyAlert}>
                  <Grid item>
                    <Typography variant='h4' className={this.props.classes.alertText}>
                      대기중인 방이 없습니다. <br /> 방을 생성해보세요
                    </Typography>
                  </Grid>
                  <Grid container direction='row' justify='space-evenly' alignItems='center'>
                    <Tooltip title='방만들기' aria-label='add' onClick={() => this.props.makeRooms()}>
                      <Fab color='secondary'>
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title='새로고침' aria-label='add' onClick={() => this.props.getRooms()}>
                      <Fab color='primary'>
                        <RefreshIcon />
                      </Fab>
                    </Tooltip>
                  </Grid>
                </Paper>
              </Grid>
            : <div>
                <div className={this.props.classes.section1}>
                  {
                    this.state.rooms.map((room, idx) => (
                    <RoomList key={idx} roomName={room.roomName} isWait={room.isWait} 
                      isLocked={room.isLocked} isFull={room.isFull} login={this.props.login} 
                    />))
                  }
                </div>
                <Tooltip title='방만들기' aria-label='add' onClick={() => this.props.makeRooms()}>
                  <Fab color='secondary' className={this.props.classes.absolute}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title='새로고침' aria-label='add' onClick={() => this.props.getRooms()}>
                  <Fab color='primary' className={this.props.classes.refresh}>
                    <RefreshIcon />
                  </Fab>
                </Tooltip>
              </div>
        }
      </div>
    );
  }

}

// function SelectRoom({ login, roomList, getRooms, makeRooms, isMaking }) {
//   const classes = useStyles();
//   const history = useHistory();
//   const [currentGame, selectedGame] = React.useState(0);
//   const [rooms, getRoomList] = React.useState([{}]);

//   React.useEffect(() => {
//     if (!cookie.load('username')) {
//       history.push('/');
//     } else if (!cookie.load('selectedGame')) {
//       history.push('/selectgame')
//     } else if (cookie.load('selectedRoom')){
//       history.push('/waitingroom')
//     }
    
//     selectedGame(Number(cookie.load('selectedGame')))
//     getRoomList(roomList);

//     // 새로운 방이 생성되기 전까지 실행
//     if(rooms[0] === undefined){  
//       setTimeout(getRooms.bind(), 1000)
//     }
//   });

  

  

  


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
        if(cookie.load('selectedGame') !== '0'){
          const response = await axios({
            method: 'get',
            url: 'http://localhost:3001/rooms/roomlist',
            withCredentials: true,
          })
          dispatch({ type: 'GET_ROOMS', payload: response.data });
        }
      } catch (err) {
        console.log(err)
      }
    },
    makeRooms: function () {
      dispatch({ type: 'MAKE_ROOM' });
    },
  };
};

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(withRouter(withStyles(styles)(SelectRoom)));
