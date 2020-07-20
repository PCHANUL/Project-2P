import { createStore, combineReducers } from 'redux';
import isLoginReducer from './reducers/isLoginReducer';

const rootReducer = combineReducers({
  login: isLoginReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
