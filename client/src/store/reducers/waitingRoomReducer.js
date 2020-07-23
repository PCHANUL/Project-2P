import * as actionTypes from '../actions';

const initialState = {
  selectedRoom: 0,
  roomUsers: [
    { username: 'Opponent', avatar: 'smiley face', isReady: false },
    { username: 'Current', avatar: 'kissy face', isReady: false },
  ],
  chat: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_LOG:
      const chatCopy = state.chat.map((el) => {
        return { ...el };
      });
      return {
        roomUsers: [{ ...state.roomUsers[0] }, { ...state.roomUsers[1] }],
        chat: [...chatCopy, action.payload],
      };
    case actionTypes.READY:
      // payload에 유저네임을 받아 일치하는 아이디의 isReady를 바꿔준다.
      state.roomUsers.map((user) => {
        if (user.username === action.payload) {
          user.isReady = !user.isReady;
        }
        return user;
      });

      const chatCopy1 = state.chat.map((el) => {
        return { ...el };
      });

      return {
        roomUsers: [{ ...state.roomUsers[0] }, { ...state.roomUsers[1] }],
        chat: [...chatCopy1] /* 완전복제 해야함 */,
      };
    case actionTypes.JOIN_ROOM:
      // 소켓으로 방에 들어갔음을 전달하고 반환값으로 방에있는 유저를 돌려받음.

      // payload 안에는 { username: '123', avatar: 'id' } 를 받는다
      action.payload.isReady = false;
      state.roomUsers.push(action.payload);

      const chatCopy2 = state.chat.map((el) => {
        return { ...el };
      });
      return {
        chat: [...chatCopy2] /* 완전복제 해야함 */,
        roomUsers: [{ ...state.roomUsers[0] }, { ...state.roomUsers[1] }],
      };
    case actionTypes.LEAVE_ROOM:
      // 소켓으로 방에서 나갔음을 전달함
      return {
        chat: [],
        roomUsers: [],
      };
    case actionTypes.SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.selected,
      };
    default:
      return state;
  }
};

export default reducer;
