import Signin from '../Components/Login/Signin';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

const axios = require('axios');

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state) {
  return {
    login: state.login,
  };
}

function mapReduxDispatchToReactProps(dispatch) {
  return {
    signin: async (username, password) => {
      let result = await Login(username, password);
      if (result.data.message) {
        let userData = await Mypage();
        username = userData.data.nickname;
        let avatar = userData.data.avatarId;
        dispatch({ type: actionTypes.LOGIN, payload: { username, avatar } });
      } else {
        alert(result.data.error);
      }
    },
  };
}

// LOGIN (post)
async function Login(userId, password) {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/users/signin',
      data: {
        userId: userId,
        password: password,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    alert(error);
  }
}

// MYPAGE (get)
async function Mypage() {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3001/users/mypage',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    alert(error);
  }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Signin);
