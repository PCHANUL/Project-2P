import Signin from '../Components/Login/Signin';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    login: state.login,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    // onEmailType: (email) => dispatch({ type: actionTypes.EMAIL_INPUT, payload: email }),
    // onPasswordType: (password) => dispatch({ type: actionTypes.PASSWORD_INPUT, payload: password }),
    signin: (username, password) =>
      dispatch({ type: actionTypes.LOGIN, payload: { username, password } }),
  };
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Signin);
