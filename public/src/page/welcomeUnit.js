import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const Wrapper = styled.div`
  margin:8000px 0;
  .welcomeImage{
    margin: 0 auto;
    display: table;
    margin-top:200px;
    background-color: rgba(0,0,0,.8);
    position:relative;
    padding:40px;
    z-index: 11;
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
  /*
  <div className="welcomeImage" style={{
    transform:"matrix("+ this.state.rotate +",0,0, "+ this.state.rotate +",0,0)"
  }}>
    <img src="https://vignette.wikia.nocookie.net/ichc-channel/images/6/68/Xbox_Original_logo.png/revision/latest/scale-to-width-down/640?cb=20160410200556"></img>
  </div>
  <p className="description">Bochenek to chuj!</p>
  */
  render() {
      return (
        <Wrapper>

        </Wrapper>
     )
   }
}

export default WelcomeUnit
