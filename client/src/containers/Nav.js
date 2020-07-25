import Nav from '../Components/Nav/Nav';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import cookie from 'react-cookies'

const axios = require('axios')

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
    
  };
}


export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Nav);
