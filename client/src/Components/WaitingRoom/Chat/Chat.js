import React from 'react';
import './Chat.css';
import Messages from '../Messages/Messages';

const Chat = ({ chat }) => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Messages chat={chat} />
    </div>
  );
};

export default Chat;
