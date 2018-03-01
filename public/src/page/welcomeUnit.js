import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom:80000px;
  .welcomeImage{
    margin: 0 auto;
    display: table;
    background-color: rgba(0,0,0,1);
    position:fixed;
    padding:40px;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .blur{
      width:100%;
      height:100%;
      filter: blur(20px);
      position:absolute;
      top:0;
      left:0;
      z-index:10;
    }
  }
  p{
    max-width: 80%;
    color:#94C83E;
    text-align: center;
    margin:0 auto;
    display: table;
    margin-top:1000px;
    margin-bottom: 3000px;
  }
`
let text = "Lorem ipsum dolor sissa leo semper turpis, non blandit libero augue et tellus. Quisque egestas arcu arcu, et tristique tellus laoreet vitae. Nam dictum libero leo, non "
let list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
let mainRotate = 1
let scrollPosition = 0
let lastScrollPosition = 0
let scrollUp = false
class WelcomeUnit extends Component {
  state = {
    rotate: 1
  }
  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    scrollPosition = document.documentElement.scrollTop
    if(scrollPosition > lastScrollPosition)
      scrollUp = false
    else
      scrollUp = true
    lastScrollPosition = document.documentElement.scrollTop
    if(scrollUp){
      mainRotate += 0.03
      if(document.documentElement.scrollTop === 0)
        mainRotate = 1
    }else{
      mainRotate -= 0.03
    }
    this.setState({...this.state, rotate: mainRotate})
  }
  render() {
      return (
        <Wrapper>
          <div className="welcomeImage">
            <img src="https://vignette.wikia.nocookie.net/ichc-channel/images/6/68/Xbox_Original_logo.png/revision/latest/scale-to-width-down/640?cb=20160410200556"></img>
          </div>
        </Wrapper>
     )
   }
}

export default WelcomeUnit
