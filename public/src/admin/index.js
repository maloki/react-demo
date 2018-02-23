import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./login.js"
import styled from 'styled-components'
import Panel from "./panel.js"

class Index extends Component {
  state = {

  }
  componentWillMount(){

  }

  render() {
      return (
        <div>
          {true ?
           <Panel />
            :
            <Login />
          }
        </div>
     )
   }
}

export default Index
