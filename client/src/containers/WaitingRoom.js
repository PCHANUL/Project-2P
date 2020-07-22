import WaitingRoom from '../Pages/WaitingRoom/WaitingRoom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');

// const socketSubscribe = (dispatch) => {
//   socket.on('joinRoom', (data) => {
//     dispatch();
//   });
//   socket.on('sendChat', (data) => {
//     dispatch();
//   });
// };

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    waitingRoom: state.waitingRoom,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  // socketSubscribe(dispatch);
  return {
    chatHandler: (chat) => dispatch({ type: actionTypes.CHAT_LOG, payload: chat }),

    // (chat) => {
    //   socket.emit('send message', { type });
    // },

    readyHandler: (username) => dispatch({ type: actionTypes.READY, payload: username }),
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(WaitingRoom);
