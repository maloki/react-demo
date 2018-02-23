import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import polish from 'react-timeago/lib/language-strings/pl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import XLSX from 'xlsx';

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
`
const formatter = buildFormatter(polish)

class UserList extends Component {
  state = {
    users: [],
    deleteId: ""
  }
  componentWillMount(){
    axios.get('/api/user/getAll').then((response) => {
      if(response.data.success){
        this.setState({...this.state, users: response.data.payload})
      }
    })
  }
  deleteUser(id){
    const payload = { userId: id }
    axios.post('/api/user/delete', payload)
    const users = this.state.users.filter(u => u.id !== id)
    this.setState({...this.state, users: users, deleteId: ""})
  }
  render() {
      return (
        <Wrapper>
          <h1>Lista uzytkownikow</h1>
          {this.state.users
            .sort((a, b) => {
              if(a.dateRegistered < b.dateRegistered) return 1;
              if(a.dateRegistered > b.dateRegistered) return -1;
              return 0;
            })
            .map((u,i) => {
              return (
                <div key={u._id} className="fact">
                  <div className="deleteWrap">
                    {
                      this.state.deleteId === u._id ?
                      <div className="confirmDeleteWrap">
                        <button onClick={() => this.deleteUser(u._id)} className="confirm">Potwierdz</button>
                        <button onClick={() => this.setState({...this.state, deleteId: ""})} className="cancel">Anuluj</button>
                      </div>
                      :
                      <button onClick={() => this.setState({...this.state, deleteId: u._id})}>Usun</button>
                    }
                  </div>
                  <div className="index">#{i + 1}</div>
                  <span>Nazwa:</span>
                  <div className="text">{u.name}</div>
                  <span>Email:</span>
                  <div className="category">{u.email}</div>
                  <span>Dolaczyl:</span>
                  <TimeAgo formatter={formatter} date={u.dateRegistered} />
                </div>
              )
          })}
        </Wrapper>
     )
   }
}

export default UserList
