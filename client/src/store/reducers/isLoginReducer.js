import * as actionTypes from '../actions';

const initialState = {
  isLogin: false,
  username: '',
  avatar: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      // action.payload 에 있는 정보로 로그인을 할수 있늕지 확인한 후, 로그인 스테이트를 바꿔준다.
      // 로그인 실패시
      // axios.post('login주소', {action.payload정보}, {withCredentials: true}, (result) => {
      // if (result.stauts === 200) return {...state, isLogin: true}
      // else return state
      // })
      // 여기에 로그인했을때 받는 유저이름과 아바타를 state에 추가
      return {
        ...state,
        isLogin: true,
        username: action.payload.username,
        // avatar: action.payload.avatar,
        avatar: 'helllllllo',
      };

    case actionTypes.LOGOUT:
      // 현재 가지고 있는 세션을 session.destroy할수있게 api요청
      return {
        isLogin: false,
      };
    case actionTypes.SIGN_UP:
      // sign up 할수 있는 아이디인지 서버에 확인하고 **payload: { username, password} **
      // username, default avatar를 돌려받는다

      return {
        ...state,
        isLogin: true,
        username: action.payload.username,
        avatar: 'default Avatar',
        // username: 'userData.data.nickname',
        // avatar: 'userData.data.avatarId',
      };
    default:
      return state;
  }
};

export default reducer;
