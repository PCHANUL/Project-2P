import Signup from '../Components/Login/Signup';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import cookie from 'react-cookies'


function mapReduxStateToReactProps(state) {
  return {
    login: state.login,
  };
}
function mapReduxDispatchToReactProps(dispatch) {
  return {
    
  }
}


export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Signup);
