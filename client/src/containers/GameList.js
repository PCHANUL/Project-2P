import GameList from '../Components/GameList/GameList';
import { connect } from 'react-redux';

function mapReduxStateToReactProps(state) {
  return {

  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    getRooms: function() {
      console.log('awefawef')
      dispatch({type:"GET_ROOMS"})
    }
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(GameList);