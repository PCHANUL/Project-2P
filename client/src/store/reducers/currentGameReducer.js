import * as actionTypes from '../actions';

const initialState = {
  currentGame: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_GAME:
      // action.payload 에 있는 정보로 로그인을 할수 있늕지 확인한 후, 로그인 스테이트를 바꿔준다.
      // 로그인 실패시
      // axios.post('login주소', {action.payload정보}, {withCredentials: true}, (result) => {
      // if (result.stauts === 200) return {...state, isLogin: true}
      // else return state
      // })
      return {
        ...state,
        currentGame: action.payload,
      };
    case actionTypes.RESELECT_GAME:
      return {
        ...state,
        currentGame: '',
      };
    default:
      return state;
  }
};

export default reducer;
