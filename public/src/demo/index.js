import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import GenericComponent from './generic.js'

const Wrapper = styled.div`
  font-family: "arial";
  h1{
  	text-align:center;
  	margin-top:20px;
  }
  .center{
  	margin:0 auto;
  	display:table;
  }
`

const Section = styled.div`
	display:inline-block;
	margin:26px 8px 0px 8px;
	h3{
		text-align:center;
		margin-bottom:10px;
	}
`

class Index extends Component {
  state = {
    sections: []
  }
  componentWillMount(){
  	//you can assign it also in state object if you know values, but i wanted to show you how setState works ;)
  	this.setState({
  	  sections:[
    	{name: "Cars", items: [
    		{name: "tesla"},
    		{name: "volvo"},
    		{name: "mercedes"},
    		{name: "porsche"},
          ]},
    	{name: "Motorcycles", items: [
    		{name: "ducati"},
    		{name: "honda"},
    		{name: "suzuki"},
    		{name: "ktm"},
    	  ]}
      ]})
  }
  componentDidMount(){}
  componentWillUpdate(){}
  componentWillReceiveProps(){}
  //this is the most common ones, you can read more about react component lifecycle
  render() {
  	if(this.state.sections.length <= 0){
  		return <div/>
  	}else{
  		return (
      	<Wrapper>
	      	<h1>This is a react demo</h1>
	      	<div className="center">
	      		{this.state.sections.map((s, i) => {
		      		return (
		      			<Section key={i}>
			      			<h3>{s.name}</h3>
			      			<GenericComponent items={s.items} />
		      			</Section>
		      		)
	      		})}
	      	</div>
      	</Wrapper>
     )
  	}
   }
}

export default Index


