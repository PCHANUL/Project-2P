import { createStore, combineReducers } from 'redux';
import isLoginReducer from './reducers/isLoginReducer';
import selectedRoom from './reducers/selectedRoom';

const rootReducer = combineReducers({
  login: isLoginReducer,
  selectedRoom: selectedRoom,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
