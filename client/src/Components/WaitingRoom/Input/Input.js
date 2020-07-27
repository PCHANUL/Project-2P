import React, { useState } from 'react';
import cookie from 'react-cookies';
import './Input.css';


const Input = ({ sendChat }) => {
  const [message, setMessage] = useState('');

  return (
    <form className='form'>
      <input
        type='text'
        className='input'
        placeholder='메시지를 입력하세요'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          // e.preventDefault();
          if (message === '') return;
          const text = { username: cookie.load('username'), text: message };
          if (e.key === 'Enter') {
            sendChat(text, cookie.load('username'));
            setMessage('');
          }
        }}
      />
      <button
        className='sendButton'
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          if (message === '') return;
          const text = { username: cookie.load('username'), text: message };
          sendChat(text, cookie.load('username'));
          setMessage('');
        }}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
