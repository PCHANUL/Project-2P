import Signup from '../Components/Login/Signup';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

const axios = require('axios')

function mapReduxStateToReactProps(state) {
  return {
    login: state.login,
  };
}
function mapReduxDispatchToReactProps(dispatch) {
  return {
    signup: async (username, nickname, password) => {

    let result = await UserSignup(username, nickname, password)
    if(result.data.message) {
      await Login(username, password)
      let userData = await Mypage()
      username = userData.data.nickname
      let avatar = userData.data.avatarId
      dispatch({ type: actionTypes.LOGIN, payload: { username, avatar } })
    }
  }
}}


// SIGN_UP (post)
async function UserSignup(userId, nickname, password) {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/users/signup',
      data: {
        userId: userId,
        nickname: nickname,
        password: password,
      },
      withCredentials: true,
    })
    response.data.error
    ? alert(response.data.error)
    : alert('로그인에 성공하였습니다')
    return response
  } catch (error) {
    console.log(error)
  }
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
    })
    return response
  } catch (error) {
    alert(error)
  }
}

// MYPAGE (get)
async function Mypage() {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3001/users/mypage',
      withCredentials: true,
    })
    return response
  } catch (error) {
    alert(error)
  }
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Signup);
