import * as React from 'react'
import './Chat.css'
import Messages from '../Messages/Messages';

interface Props {
  chat: Object[];
};

const Chat = ({ chat }: Props) => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Messages chat={chat} />
    </div>
  )
}

export default Chat;