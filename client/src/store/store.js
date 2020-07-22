import { createStore, combineReducers } from 'redux';
import currentGameReducer from './reducers/currentGameReducer';
import waitingRoomReducer from './reducers/waitingRoomReducer';
import isLoginReducer from './reducers/isLoginReducer';
import selectedRoom from './reducers/selectedRoom';

const rootReducer = combineReducers({
  login: isLoginReducer,
  currentGame: currentGameReducer,
  waitingRoom: waitingRoomReducer,
  selectedRoom: selectedRoom,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
