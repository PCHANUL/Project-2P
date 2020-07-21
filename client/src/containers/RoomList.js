import RoomList from '../Components/SelectRoom/RoomList';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import store from '../store/store';

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    selected: state.selectedRoom
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    selectRoom: function(roomName) {
      dispatch({type:"SELECTED_ROOM", selected: roomName})
    }
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(RoomList);