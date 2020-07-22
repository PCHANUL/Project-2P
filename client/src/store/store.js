import { createStore, combineReducers } from 'redux';
import isLoginReducer from './reducers/isLoginReducer';
import currentGameReducer from './reducers/currentGameReducer';
import waitingRoomReducer from './reducers/waitingRoomReducer';

const rootReducer = combineReducers({
  login: isLoginReducer,
  currentGame: currentGameReducer,
  waitingRoom: waitingRoomReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
