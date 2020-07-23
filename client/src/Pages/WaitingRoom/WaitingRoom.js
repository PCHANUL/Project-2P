import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import io from 'socket.io-client';

import Users from '../../Components/WaitingRoom/Users/Users';
import Chat from '../../Components/WaitingRoom/Chat/Chat';
import Input from '../../Components/WaitingRoom/Input/Input';
import ReadyProgress from '../../Components/WaitingRoom/ReadyProgress';

import './WaitingRoom.css';
let socket = io.connect('http://localhost:3001');

const WaitingRoom = (props) => {
  const { roomUsers, chat } = props.waitingRoom;
  const bothPlayersReady = roomUsers.filter((user) => user.isReady).length === 2;

  useEffect(() => {
    props.enterChatroom(props.waitingRoom.selectedRoom, props.login.username);
  }, []);

  return (
    <div>
      {bothPlayersReady ? <ReadyProgress /> : null}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Users user={roomUsers[0]} readyHandler={props.readyHandler} />
        <Users user={roomUsers[1]} readyHandler={props.readyHandler} />
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
  socket.on('chatMessage', (data) => {
    dispatch({ type: actionTypes.CHAT_LOG, payload: data });
  });

  socket.on('message', (data) => {
    dispatch({ type: actionTypes.CHAT_LOG, payload: data });
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
    enterChatroom: (roomname, username) => {
      socket.emit('joinRoom', { roomname, username });
    },
    chatHandler: (chat) => {
      // dispatch({ type: actionTypes.CHAT_LOG, payload: chat });
      socket.emit('message', chat.text);
    },

    // (chat) => {
    //   socket.emit('send message', { type });
    // },

    readyHandler: (username) => dispatch({ type: actionTypes.READY, payload: username }),
  };
};
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(WaitingRoom);
