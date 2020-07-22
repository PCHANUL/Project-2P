import React from 'react';
import Users from '../../Components/WaitingRoom/Users/Users';
import Chat from '../../Components/WaitingRoom/Chat/Chat';
import Input from '../../Components/WaitingRoom/Input/Input';
import ReadyProgress from '../../Components/WaitingRoom/ReadyProgress';

import './WaitingRoom.css';

const WaitingRoom = (props) => {
  const { roomUsers, chat } = props.waitingRoom;
  const bothPlayersReady = roomUsers.filter((user) => user.isReady).length === 2;

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
          <Input sendChat={props.chatHandler} username={roomUsers[1].username} />
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
