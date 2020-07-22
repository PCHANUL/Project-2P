import Signup from '../Components/Login/Signup';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

function mapReduxStateToReactProps(state) {
  return {
    login: state.login,
  };
}
function mapReduxDispatchToReactProps(dispatch) {
  return {
    signup: (username, password) =>
      dispatch({ type: actionTypes.SIGN_UP, payload: { username, password } }),
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Signup);
