import Signin from '../Components/Login/Signin'
import {connect} from 'react-redux';

// redux에서 store의 값이 변경될때마다 실행, store의 state값을 받음
function mapReduxStateToReactProps(state){
  return {}
}
function mapReduxDispatchToReactProps(dispatch){
  return {
    onClick: function(email){
      dispatch({type:"INCREMENT", email:email})
    }
  }
}
export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Signin);

/*
import React, { Component } from "react";
import store from '../store'
 
export default class extends Component {
  
  render() {
    return <Signin onClick={function(email){
      store.dispatch({type:'INCREMENT', email:email})
    }.bind(this)}></Signin>
  }
}
*/