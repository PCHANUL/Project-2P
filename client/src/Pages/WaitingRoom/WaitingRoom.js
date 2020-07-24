import React from 'react';
import Users from '../../Components/WaitingRoom/Users/Users';
import Chat from '../../Components/WaitingRoom/Chat/Chat';
import Input from '../../Components/WaitingRoom/Input/Input';
import ReadyProgress from '../../Components/WaitingRoom/ReadyProgress';
import { useHistory } from 'react-router-dom'
import cookie from 'react-cookies'

import './WaitingRoom.css';

const WaitingRoom = ({ waitingRoom, readyHandler, chatHandler, isLogin }) => {
  const history = useHistory();
  const { roomUsers, chat } = waitingRoom;
  const bothPlayersReady = roomUsers.filter((user) => user.isReady).length === 2;

  React.useEffect(() => {
    if(!cookie.load('username')){
      history.push('/')
    }
  })

  return (
    <div>
      {bothPlayersReady ? <ReadyProgress /> : null}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Users user={roomUsers[0]} readyHandler={readyHandler} />
        <Users user={roomUsers[1]} readyHandler={readyHandler} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='container'>
          <Chat chat={chat} />
          <Input sendChat={chatHandler} username={roomUsers[1].username} />
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
