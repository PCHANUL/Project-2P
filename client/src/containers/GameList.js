import GameList from '../Components/GameList/GameList';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    currentGame: state.currentGame,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    selectGame: (gameName) => dispatch({ type: actionTypes.SELECT_GAME, payload: gameName }),
    reselectGame: () => dispatch({ type: actionTypes.RESELECT_GAME }),
    getRooms: function() {
      dispatch({type:"GET_ROOMS"})
    },
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(GameList);
