import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import WelcomeUnit from './welcomeUnit.js'
import zenscroll from "zenscroll"

const Wrapper = styled.div`
  background-color:#000;
  width:100%;
  height:100vh;
  .pusher{
    width:10px;
    height:20000px;
  }
  h1{
    color:#94C83E;
    font-size: 22px;
  }
  .content{
    position:relative;
    z-index: 9;

  }
`

const Overlay = styled.div`
  background-color:#000;
  width:100%;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  z-index:1;
  .floatingElements{
    z-index: 1;
    .element{
      position:fixed;
      top:0;
      left:0;
      width:10px;
      height:10px;
      background-color: #94C83E;
      border-radius: 50%;
    }
  }
`
//old background size width:{min:10,max:30}
const rnd = {
  xMargin:{min:30,max:80},
  yMargin:{min:30,max:80},
  width:{min:7,max:20}
}
let lastScrollPosition = 0
const scrollRatio = {min: 5, max: 12}
//scale is the same for every element, so use only min value
const scaleRatio = {min: 1, max: 9}
let isScrolling = false
//vertical
const speedAcceleration = 0.3
const speedMax = 9
const speedBrakingRatio = 0.2
// horizontal
const horizontalSpeedRatio = 0.05
const horizontalSpeedMax = 1
const horizontalSpeedBrakingRatio = 0.02
let scrollTimer = null
let scrollUp = false
let content = {
  verticalSpeed: 0,
  verticalSpeedRatio: 14,
  verticalSpeedMax: 30,
  verticalSpeedBrakingRatio: 5,
  targetY: 0
}
let scrollPosition = 0
let currentGlobalScroll = 0
let isJustScrolled = false
let isScrollActive = false

class Index extends Component {
  state = {
    backgroundFloatingElements: [],
    content: {y: 0}
  }
  constructor(props){
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentWillMount(){
    let list = []
    let neededElementsList = []
    const browserWidth = window.innerWidth
    const browserHeight = window.innerHeight
    const xElementsCount = Math.round(browserWidth / 26)
    const yElementsCount = Math.round(browserHeight / 26)
    let overallWidth = 0
    let overallHeight = 0
    let nextElementXMargin = 10
    let nextElementYMargin = this.getRandomNumber(rnd.yMargin.min, rnd.yMargin.max)
    for(let i = 0; i < 10000; i++){
      // its square, so height will be identical
      const calculatedWidth = this.getRandomNumber(rnd.width.min, rnd.width.max)
      overallWidth += Math.round(calculatedWidth + nextElementXMargin)
      if(overallWidth >= browserWidth){
        overallWidth = 0
        overallHeight += rnd.yMargin.max
        nextElementXMargin -= rnd.xMargin.min
      }
      if(overallHeight >= browserHeight){
        break
      }
      const opacity = this.getRandomNumber(1,9)
      const xCenter = Math.round(window.innerWidth / 2)
      const yCenter = Math.round(window.innerHeight / 2)
      list.push({
        x:xCenter,
        y:yCenter,
        width:1,
        height: 1,
        angle: this.getRandomNumber(-180,180),
        opacity: opacity,
        scrollRatio: this.getRandomNumber(scrollRatio.min, scrollRatio.max),
        scaleRatio: this.getRandomDoubleFromDigit(scaleRatio.min, scaleRatio.max, 100),
        scaleDown: false,
        rotateRatio: 0.0,
        rotate: 0,
        speed: 0,
        distance: 0,
        distanceRatio: this.getRandomDoubleFromDigit(1,9, 10),
      })
      nextElementXMargin = this.getRandomNumber(rnd.xMargin.min, rnd.xMargin.max)
      nextElementYMargin = this.getRandomNumber(rnd.yMargin.min, rnd.yMargin.max)
    }
    this.setState({...this.state, backgroundFloatingElements: list, content: {y: document.documentElement.scrollTop}}, () => this.applyAnimationToElements())
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  getRandomNumber(min, max){
     return Math.round(Math.random() * (max - min) + min)
  }
  getRandomDoubleFromDigit(min, max, decimalPlaces){
     return Math.round(Math.random() * (max - min) + min) / decimalPlaces
  }
  getRandomDouble(min, max){
     return Math.round(min * 10) / 10
  }
  handleScroll(){
    currentGlobalScroll = document.documentElement.scrollTop
    isScrolling = true
    if(scrollTimer !== null) {
        clearTimeout(scrollTimer)
    }
    scrollTimer = setTimeout(function() {
        isScrolling = false
    }, 200)
    const currentScroll = document.documentElement.scrollTop
    scrollPosition = currentScroll
    if(currentScroll > lastScrollPosition)
      scrollUp = false
    else
      scrollUp = true
    lastScrollPosition = currentScroll
  }
  applyAnimationToElements(){
    //background elements
    let elements = this.state.backgroundFloatingElements
    let list = []
    elements.map((el, i) => {
      let w = el.width
      let h = el.height
      let x = el.x
      let y = el.y
      let scaleDown
      let verticalSpeed
      let horizontalSpeed
      let distance = el.distance
      let angle = el.angle
      let distanceRatio = el.distanceRatio
      let scaleRatio = el.scaleRatio
      let speed = el.speed

      if(isScrolling){
        if(speed <= speedMax){
          speed += speedAcceleration
        }
        if(!scrollUp){
          distance += speed
        }else{
          distance -= speed
        }
      }
      if(!isScrolling && speed > 0){
        if(speed > 1)
          speed -= speedBrakingRatio
        if(!scrollUp){
          distance += speed
        }else{
          distance -= speed
        }
      }
      if(speed < 1)
        speed = 1
      if(isScrolling || speed > 0){
        if(!scrollUp){
          w = distance / 100
        }else{
          w = distance / 100
        }
      }
      x = Math.round(Math.cos(el.angle * Math.PI/180) * distance + Math.round(window.innerWidth / 2))
      y = Math.round(Math.sin(el.angle * Math.PI/180) * distance + Math.round(window.innerHeight / 2))
      if((x < 0 || x > window.innerWidth) || (y < 0 || y > window.innerHeight)){
        distance = 0
        angle = this.getRandomNumber(-180,180)
        scaleRatio = this.getRandomDoubleFromDigit(1, 9, 10)
        distanceRatio = this.getRandomDoubleFromDigit(7,9, 100)
        w = 1
        h = 1
      }
      if(i === 0)
        console.log(speed, distance, isScrolling)
      // verticalSpeed
    /*  let scaleDown, w
      w = el.width
      let verticalSpeed = el.verticalSpeed
      let y = el.y
      if(isScrolling){
        if(verticalSpeed <= verticalSpeedMax){
            verticalSpeed += verticalSpeedRatio
        }
        if(scrollUp){
          y += (verticalSpeed)
        }else{
          y -= (verticalSpeed)
        }
      }
      if(!isScrolling && verticalSpeed > 0){
        if(!scrollUp){
          verticalSpeed -= verticalSpeedBrakingRatio
          y -= verticalSpeed
        }else{
          verticalSpeed -= verticalSpeedBrakingRatio
          y += verticalSpeed
        }
      }
      if(scrollUp){
        if(y >= window.innerHeight + 10){
          y = -10
        }
      }
      else{
        if(y < -10){
          y = window.innerHeight + 10
        }
      }
      if(verticalSpeed < 0)
        verticalSpeed = 0
      // horizontal speed
      let horizontalSpeed = el.horizontalSpeed
      let x = el.x
      const halfScreenPerimeter = Math.round(window.innerWidth / 2)
      */
      list.push({
        width: w,
        height:w,
        x: x,
        y: y,
        opacity: el.opacity,
        scrollRatio: el.scrollRatio,
        scaleRatio: scaleRatio,
        scaleDown: scaleDown,
        rotateRatio: el.rotateRatio,
        rotate: el.rotate + el.rotateRatio,
        speed: speed,
        distance: distance,
        angle: angle,
        distanceRatio: distanceRatio
      })
    })
    // content units
  /*  let yContent = this.state.content.y
    if(isScrolling){
      if(content.verticalSpeed <= content.verticalSpeedMax){
          content.verticalSpeed += content.verticalSpeedRatio
      }
      if(scrollUp){
        yContent += (content.verticalSpeed)
      }else{
        yContent -= (content.verticalSpeed)
      }
    }
    if(!isScrolling){
      if(!scrollUp){
        if(yContent < -(currentGlobalScroll)){
          content.verticalSpeed -= content.verticalSpeedBrakingRatio
        }
        yContent -= content.verticalSpeed
      }else{
        content.verticalSpeed -= content.verticalSpeedBrakingRatio
        yContent += content.verticalSpeed
      }
    }
    if(content.verticalSpeed < 0)
      content.verticalSpeed = 0
      */
    this.setState({
      ...this.state,
      backgroundFloatingElements: list,
      content: {...this.state.content}
    }, () => window.requestAnimationFrame(this.applyAnimationToElements.bind(this)))
  }
  render() {
      return (
        <Wrapper>
        <Overlay>
          <div className="floatingElements">
            {this.state.backgroundFloatingElements.map((el, i) => {
              return(<div
                key={i}
                className="element"
                style={
                  {
                    top:el.y + "px",
                    left: el.x + "px",
                    width: el.width,
                    height: el.height,
                    opacity:"0." + el.opacity,
                    transform: "rotate(" + el.rotate + "deg)"
                  }}>
              </div>)
            })}
          </div>
        </Overlay>
        <div className="content" style={{marginTop: -(this.state.content.y)}}>
          <WelcomeUnit />
        </div>
        </Wrapper>
     )
   }
}

export default Index
