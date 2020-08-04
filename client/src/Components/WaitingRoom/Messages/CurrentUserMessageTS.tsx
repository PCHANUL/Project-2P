import * as React from 'react';
import './Message.css';

interface Prop {
  chat: {
    username: string;
    text: string;
  }
}

const CurrentUserMessage = ({ chat }) => {
  return (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{chat.username}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{chat.text}</p>
      </div>
    </div>
  )
}

export default CurrentUserMessage;