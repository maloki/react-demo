import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import polish from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import XLSX from 'xlsx';
import EditFact from './panel-add-fact.js'

const Wrapper = styled.div`
  width:75%;
    h1{
      font-size:18px;
    }
  .fact{
    width:700px;
    background-color:rgba(190,202,208,.2);
    padding:20px;
    margin-top:14px;
    img{
      width:330px;
      height:250px;
      display:block;
    }
    span{
      display:block;
      font-weight: bold;
      margin:14px 0 6px 0;
    }
    .text,.category{

    }
    .tags{
      .tag{
        background-color: #000;
        color:#fff;
        padding:6px;
        display: inline-block;
        margin:8px 10px 0 0;
      }
    }
  }
  .deleteWrap{
    float:right;
    button{
      border:none;
      background-color:rgba(240, 65, 36,.2);
      padding:5px 12px;
      cursor:pointer;
      margin-left:8px;
      &.confirm{
        background-color:#ACE0AC;
      }
    }
  }
  .editButton{
    background-color:rgba(0,0,0,.4) !important;
    color:#fff;
    margin-right:10px;
  }
`
const formatter = buildFormatter(polish)
let request = false

class FactList extends Component {
  state = {
    facts: [],
    deleteId: "",
    editId: ""
  }
  componentWillMount(){
    request = true
    axios.get('/api/fact/getAllWithCount/20/-').then((response) => {
      request = false
      if(response.data.success){
        this.setState({...this.state, facts: response.data.payload.sort((a, b) => {
            if(a.dateCreated < b.dateCreated) return 1;
            if(a.dateCreated > b.dateCreated) return -1;
            return 0;
          })})
      }
    })
  }
  componentDidMount() {
   window.addEventListener('scroll', this.handleScroll);
  }
  deleteFact(id){
    const payload = { factId: id }
    axios.post('/api/fact/delete', payload)
    const facts = this.state.facts.filter(f => f.id !== id)
    this.setState({...this.state, facts: facts, deleteId: ""})
  }
  handleScroll = () => {
    let el = document.getElementById('list--bottom');
    if(el !== null){
      let minPixel = el.offsetTop;
      if(minPixel < (document.documentElement.scrollTop + screen.height) && !request){
        request = true
        let lastId = this.state.facts[this.state.facts.length - 1].dateCreated
        axios.get('/api/fact/getAllWithCount/20/' + lastId).then((response) => {
          request = false
          if(response.data.success){
            let list = []
            this.state.facts.map(f => list.push(f))
            response.data.payload.map(p => list.push(p))
            this.setState({...this.state, facts: list.sort((a, b) => {
                if(a.dateCreated < b.dateCreated) return 1;
                if(a.dateCreated > b.dateCreated) return -1;
                return 0;
              })})
          }
        })
      }
    }
  }
  render() {
      return (
        <Wrapper>
          <h1>Lista ciekawostek</h1>
          {this.state.facts
            .map((f,i) => {
              return (
                <div key={f._id} className="fact">
                  {this.state.editId === f._id ?
                    <EditFact properties={{
                      edit: true,
                      text: f.text,
                      category: f.category,
                      tags: f.tags,
                      factId: f._id,
                      img: f.img,
                      catCount: f.categoryCount,
                      callback: (updatedFact, catCount) => {
                        if(updatedFact === null)
                          this.setState({...this.state, editId: ""})
                        else{
                          let list = this.state.facts.map(fact => {
                            if(fact._id === updatedFact._id){
                              updatedFact.categoryCount = catCount
                              return updatedFact
                            }
                            return fact
                          })
                          this.setState({...this.state, editId: "", showDone: true, facts: list})
                        }
                      }}} />
                    :
                    <div>
                      <div className="deleteWrap">
                        {
                          this.state.deleteId === f._id ?
                          <div className="confirmDeleteWrap">
                            <button onClick={() => this.deleteFact(f._id)} className="confirm">Potwierdź</button>
                            <button onClick={() => this.setState({...this.state, deleteId: ""})} className="cancel">Anuluj</button>
                          </div>
                          :
                          <div>
                            <button className="editButton" onClick={() => this.setState({...this.state, editId: f._id})}>Edytuj</button>
                            <button onClick={() => this.setState({...this.state, deleteId: f._id})}>Usuń</button>
                          </div>
                        }
                      </div>
                      <div className="index">#{i + 1}</div>
                      <span className="text">ID: {f._id}</span>
                      {f.img === undefined || f.img === "" ?
                        <div />
                        :
                        <div>
                          <span>Zdjecie:</span>
                          <img src={f.img}></img>
                        </div>
                      }
                      <span>Tekst:</span>
                      <div className="text">{f.text}</div>
                      <span>Kategoria:</span>
                      <div className="category">{f.category} ({f.categoryCount === undefined ? "0" : f.categoryCount})</div>
                      <span>Tagi:</span>
                      <div className="tags">
                        {f.tags.map((t,i) => {
                          return <div key={i} className="tag">{t}</div>
                        })}
                      </div>
                      <span>Dodano:</span>
                      <TimeAgo formatter={formatter} date={f.dateCreated} />
                    </div>
                  }
                </div>
              )
          })}
          <div id="list--bottom" />
        </Wrapper>
     )
   }
}

export default FactList
