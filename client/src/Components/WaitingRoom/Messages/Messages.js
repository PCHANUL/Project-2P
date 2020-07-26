import React from 'react';
import { connect } from 'react-redux';

import ScrollToBottom from 'react-scroll-to-bottom';
import OpponentMessage from './OpponentMessage';
import CurrentUserMessage from './CurrentUserMessage';
import cookie from 'react-cookies';
import './Messages.css';

const Messages = (props) => {
  return (
    <ScrollToBottom className='messages'>
      {props.waitingRoom.chat.map((text, idx) => {
        if (text.username !== cookie.load('username')) {
          return <OpponentMessage key={idx} chat={text} />;
        } else {
          return <CurrentUserMessage key={idx} chat={text} />;
        }
      })}
    </ScrollToBottom>
  );
};

const mapReduxStateToReactProps = (state) => {
  return {
    waitingRoom: state.waitingRoom,
    login: state.login,
  };
};

export default connect(mapReduxStateToReactProps)(Messages);
