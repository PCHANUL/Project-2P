import * as actionTypes from '../actions';

const initialState = {
  roomList: [ ],
  isMaking: false,
  currentGame: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.CHANGE_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.currentGame,
      };
    case actionTypes.MAKE_ROOM:
      return {
        ...state,
        isMaking: true,
      };
    case actionTypes.MAKE_ROOM_CLOSE:
      return {
        ...state,
        isMaking: false,
      };
    case actionTypes.GET_ROOMS:
      function createDate(roomName, isWait, isLocked, isFull) {
        return { roomName, isWait, isLocked, isFull };
      }
      
      const rows = [
        createDate('드루와드루와드루와드루와드루와드루와드루와드루와드루와드루와', true, false, false),
        createDate('드루와라', false, true, true),
        createDate('야!타', true, true, true),
        createDate('늬 내가누군지아니?', false, false, true),
        createDate('매너겜좀합시다', true, false, false),
        createDate('6학녕1반', true, true, false),
        createDate('드루와', true, false, false),
        createDate('드루와', true, false, false),
        createDate('드루와', true, false, false),
      ]; 

      return {
        ...state,
        roomList: rows,
      };
    default:
      return state;
  }
};

export default reducer;