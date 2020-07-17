import React, { Component } from 'react'

class Signin extends Component {
  state = {email:''}

  render() {
    return (
      <div>
        <input type="text" value={this.state.email} onChange={function(e){
          this.setState({ email:e.target.value })
        }.bind(this)}></input>
        <input type="button" value="enter" onClick={function(){
          this.props.onClick(this.state.email);
        }.bind(this)}></input>
      </div>
    )
  }
}

export default Signin