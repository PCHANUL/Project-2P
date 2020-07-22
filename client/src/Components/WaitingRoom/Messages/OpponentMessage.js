import React from 'react';
import './Message.css';

const OpponentMessage = ({ chat }) => {
  return (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{chat.text}</p>
      </div>
      <p className='sentText pl-10 '>{chat.username}</p>
    </div>
  );
};

export default OpponentMessage;
