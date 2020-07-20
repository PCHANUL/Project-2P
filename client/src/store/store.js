import { createStore, combineReducers } from 'redux';
import isLoginReducer from './reducers/isLoginReducer';
import currentGameReducer from './reducers/currentGameReducer';

const rootReducer = combineReducers({
  login: isLoginReducer,
  currentGame: currentGameReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
