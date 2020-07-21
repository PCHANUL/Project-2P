import MakeGame from '../Components/SelectRoom/MakeGame';
import { connect } from 'react-redux';

function mapReduxStateToReactProps(state) {
  return {
    isMaking: state.selectedRoom.isMaking,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    makeRoomsClose: function() {
      dispatch({type:"MAKE_ROOM_CLOSE"})
    }
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(MakeGame);