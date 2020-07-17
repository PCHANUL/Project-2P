import { createStore, combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
