import WaitingRoom from '../Pages/WaitingRoom/WaitingRoom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    waitingRoom: state.waitingRoom,
    isLogin: state.login.isLogin,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    chatHandler: (chat) => dispatch({ type: actionTypes.CHAT_LOG, payload: chat }),
    readyHandler: (username) => dispatch({ type: actionTypes.READY, payload: username }),
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(WaitingRoom);
