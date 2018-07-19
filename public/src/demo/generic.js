import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const Wrapper = styled.div`
  ul{
    li{
      padding:8px;
      border-bottom:1px solid #ccc;
      button{
        margin-left:5px;
      }
    }
  }
`

class Index extends Component {
  state = {
    items: []
  }
  componentWillMount(){
    // you dont have to do setState on every new objects etc. this should be in this.props all the time,
    // but since we are not updating global state, this approach is easier to understand, 
    // bottom line, dont put things from this.props to this.state, that is a bad practice
    this.setState({items: this.props.items})
  }
  handleCartButton(item, i){
    item.added = (item.added ? false : true)
    let list = this.state.items 
    list[i] = item  
    this.setState({items: list})
  }
  render() {
      return (
      	<Wrapper>
	      	<ul>
	          {this.state.items.map((item, i) => {
	          	return (
                 <li key={i}>
                   <span>#{i + 1} {item.name}</span>
                    <button onClick={() => this.handleCartButton(item)}>{item.added ? "Remove from cart" : "Add to cart"}</button>
                 </li>
                )
	          })}
	        </ul>
      	</Wrapper>
        
     )
   }
}

export default Index


