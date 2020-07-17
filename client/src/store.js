import { createStore } from 'redux';

export default createStore(function(state, action){
  // 최초의 실행
  if(state === undefined){
    return { email:'' }
  }
  if(action.type === 'INCREMENT'){
    return {...state, email:action.email}
  }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())