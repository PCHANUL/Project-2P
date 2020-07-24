import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import io from 'socket.io-client';

import Users from '../../Components/WaitingRoom/Users/Users';
import Chat from '../../Components/WaitingRoom/Chat/Chat';
import Input from '../../Components/WaitingRoom/Input/Input';
import ReadyProgress from '../../Components/WaitingRoom/ReadyProgress';

import './WaitingRoom.css';
let socket = io.connect('http://localhost:3002');

const WaitingRoom = (props) => {
  const { roomUsers, chat } = props.waitingRoom;
  const bothPlayersReady = roomUsers.filter((user) => user.isReady).length === 2;

  useEffect(() => {
    props.enterChatroom(props.waitingRoom.selectedRoom, props.login.username, props.login.avatar);
    return () => {
      props.leaveRoomHandler();
    };
  }, []);

  return (
    <div>
      {bothPlayersReady ? <ReadyProgress /> : null}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {roomUsers.map((user, idx) => {
          return <Users key={idx} user={user} readyHandler={props.readyHandler} />;
        })}
        {/* <Users user={roomUsers[0]} readyHandler={props.readyHandler} />
        <Users user={roomUsers[1]} readyHandler={props.readyHandler} /> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='container'>
          <Chat chat={chat} />
          <Input sendChat={props.chatHandler} username={props.login.username} />
        </div>
      </div>
    </div>
  );
};

const socketSubscribe = (dispatch) => {
  socket.on('systemMessage', (data) => {
    dispatch({ type: actionTypes.CHAT_LOG, payload: data });
  });

  socket.on('sendMessage', (data) => {
    dispatch({ type: actionTypes.CHAT_LOG, payload: data });
  });

  socket.on('loadUser', (data) => {
    dispatch({ type: actionTypes.LOAD_USER, payload: data });
  });

  socket.on('refreshUser', (data) => {
    dispatch({ type: actionTypes.REFRESH_USER, payload: data });
  });
};

const mapReduxStateToReactProps = (state) => {
  return {
    waitingRoom: state.waitingRoom,
    login: state.login,
  };
};

const mapReduxDispatchToReactProps = (dispatch) => {
  socketSubscribe(dispatch);
  return {
    enterChatroom: async (roomname, username, avatar) => {
      // socket = await io.connect('http://localhost:3002');
      socket.emit('joinRoom', { roomname, username, avatar });
    },
    chatHandler: (chat) => {
      // dispatch({ type: actionTypes.CHAT_LOG, payload: chat });
      socket.emit('sendMessage', chat.text);
    },
    leaveRoomHandler: () => {
      socket.emit('leave');
      socket.removeAllListeners();
      dispatch({ type: actionTypes.LEAVE_ROOM });
    },

    // readyHandler: (username) => dispatch({ type: actionTypes.READY, payload: username }),
  };
};
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(WaitingRoom);
