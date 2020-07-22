import SelectRoom from '../Pages/SelectRoom/SelectRoom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import store from '../store/store';

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    roomList: state.selectedRoom.roomList,
    isMaking: state.selectedRoom.isMaking,
    currentGame: state.selectedRoom.currentGame,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    getRooms: function() {
      dispatch({type:"GET_ROOMS"})
    },
    makeRooms: function() {
      dispatch({type:"MAKE_ROOM"})
    },
    changeCurrentGame: function(currentGame) {
      dispatch({type:"CHANGE_CURRENT_GAME", currentGame: currentGame})
    },
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(SelectRoom);