import React from 'react';
import './Chat.css';
import Messages from '../Messages/Messages';

const Chat = ({ chat }) => {
  return (
    <div>
      <Messages chat={chat} />
    </div>
  );
};

export default Chat;
