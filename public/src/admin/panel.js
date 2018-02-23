import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "./login.js"
import styled from 'styled-components'
import {Link} from 'react-router'

const Wrapper = styled.div`
  h2{
    font-size:16px;
  }
  .sideMenu{
    background-color:#222B32;
    float:left;
    height:100vh;
    position:fixed;
    left:0;
    top:0;
    width:15%;
    ul{
      margin-top:30px;
      a{
        text-decoration: none;
      }
      li{
        color:#BECAD0;
        padding:10px 34px;
        cursor:pointer;
        text-align: center;
        padding:15px 0;
        font-size: 18px;
        border-bottom:1px solid #BECAD0;
        &:hover{
          background-color:rgba(255, 255, 255,.2);
        }
      }
    }
  }
  .content{
    display:inline-block;
    margin-top:0px;
    margin-left:15%;
    width:85%;
    height:100%;
    .box{
      border:1px solid #ccc;
      margin:30px;
      padding: 50px;
      height:100%;
    }
  }
`

class Panel extends Component {
  state = {

  }

  componentWillMount(){

  }
  render() {
      return (
        <Wrapper>
          <div className="sideMenu">
            <ul>
              <Link to="/addfact"><li>Dodaj ciekawostke</li></Link>
              <Link to="/factlist"><li>Lista ciekawostek</li></Link>
              <Link to="/userlist"><li>Lista uzytkownikow</li></Link>
            </ul>
          </div>
          <div className="content">
            <div className="box">
              {this.props.children}
            </div>
          </div>
        </Wrapper>
     )
   }
}

export default Panel
