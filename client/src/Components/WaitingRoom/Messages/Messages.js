import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import OpponentMessage from './OpponentMessage';
import CurrentUserMessage from './CurrentUserMessage';
import './Messages.css';

const Messages = ({ chat }) => {
  return (
    <ScrollToBottom className='messages'>
      {chat.map((text, idx) => {
        if (text.username === 'Opponent') {
          return <OpponentMessage key={idx} chat={text} />;
        } else {
          return <CurrentUserMessage key={idx} chat={text} />;
        }
      })}
    </ScrollToBottom>
  );
};

export default Messages;
