import React, { Component } from "react";
import ReactDOM from "react-dom";

class Login extends Component {
  state = {
    name: "",
    password: "",
    error: ""
  }
  componentWillMount(){

  }
  handleLogin(){
  }
  handleKeyPress(type, e){
    this.setState({...this.state, [type]: e.target.value})
  }
  render() {
      return (
          <div>
            <h1>Panel administratora - TurnFit</h1>
            <div className="loginError"></div>
            <input onChange={(e) => this.handleKeyPress("name", e)} type="text" value={this.state.name}></input>
            <input onChange={(e) => this.handleKeyPress("password", e)} type="password" value={this.state.password}></input>
            <button onClick={() => this.handleLogin()}>Zaloguj</button>
          </div>
     )
   }
}

export default Login
