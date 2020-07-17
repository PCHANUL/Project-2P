import * as actionTypes from '../actions';

const initialState = {
  isLogin: false,
  email: '',
  password: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      if (state.email === '' || state.password === '') {
        return state;
      }
      return {
        ...state,
        isLogin: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.EMAIL_INPUT:
      return {
        ...state,
        email: action.payload,
      };
    case actionTypes.PASSWORD_INPUT:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
  // return state;
};

export default reducer;
