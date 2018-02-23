import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import axios from 'axios'

const Wrapper = styled.div`
  h1{
    font-size:18px;
  }
  .section{
    margin-top:26px;
    span{
      display: block;
      margin-bottom:10px;
      &.info{
        font-size:13px;
        color:#222B32;
      }
    }
    textarea{
      width:450px;
      height:100px;
      resize:none;
    }
    button{
      border:none;
      color:#fff;
      background-color:#222B32;
      padding:5px;
      margin-left:10px;
      cursor:pointer;
    }
    .tagList{
      margin-top:14px;
      max-width: 450px;
      &.edit{
        .tag{
          background-color: #222B32;
          padding:6px 20px 6px 6px;
          display: inline-block;
          margin:8px 10px 0 0;
          position:relative;
          .deleteTag{
            position:absolute;
            right:4px;
            top:6px;
            cursor:pointer;
            font-weight: bold;
          }
        }
      }
      .tag{
        background-color: rgba(190, 202, 208,.4);
        padding:6px 20px 6px 6px;
        display: inline-block;
        margin:8px 10px 0 0;
        position:relative;
        .deleteTag{
          position:absolute;
          right:4px;
          top:6px;
          cursor:pointer;
          font-weight: bold;
        }
      }
    }
    .image{
      display:block;
      width:330px;
      height:250px;
      margin-top:10px;
    }
    .imageInput{
      display:inline-block;
    }
    .deleteImage{
      inline-block
      margin-left:30px;
      background-color:rgba(240, 65, 36,.6);
    }
  }
  .addFactButton{
    border:none;
    color:#fff;
    background-color:#222B32;
    padding:14px;
    margin-top:20px;
    font-size:16px;
    cursor:pointer;
  }
  .errMessage{
    display: table;
    margin-top:20px;
    background-color: rgba(240, 65, 36,.2);
  }
  .done{
    padding:4px;
    background-color:#ACE0AC;
    display:table;
    margin-top:6px;
  }
  select{
    margin-left:10px;
    option{
      &::first-letter{
        text-transform: uppercase;
      }
    }
  }
  .cancel{
    border:none;
    background-color:rgba(240, 65, 36,.2);
    padding:5px 12px;
    cursor:pointer;
    margin-left:8px;
    float:right;
  }
`
class AddFacts extends Component {
  state = {
    tags: [],
    textInput: "",
    categoryInput: "",
    tagInput: "",
    err:"",
    showDone: false,
    categories: [],
    selectValue: "-",
    edit: false,
    img: "",
    imgInput: ""
  }
  componentWillMount(){
    if(this.props.properties !== undefined){
      this.setState({...this.state,
         textInput: this.props.properties.text,
         categoryInput: this.props.properties.category,
         tags: this.props.properties.tags,
         img: this.props.properties.img,
         edit: true
       })
    }
    axios.get('/api/fact/getCategories').then((response) => {
      this.setState({...this.state, categories: response.data.payload})
    });
  }
  handleInput(e, type){
    this.setState({...this.state,
       [type + "Input"]: e.target.value,
       err: "",
       selectValue: (type === "category" ? "-" : this.state.selectValue)})
  }
  handleKeyUp(keyCode){
    if(keyCode === 13)
      this.addTag()
  }
  addTag(){
    if(this.state.tagInput !== ""){
      let tags = this.state.tags
      tags.push(this.state.tagInput)
      this.setState({...this.state, tags: tags, tagInput: ""})
    }
  }
  addFact(){
    if(this.state.textInput === "" || (this.state.categoryInput === "" && this.state.selectValue === "-")){
      this.setState({...this.state, err: "Uzupelnij wszystkie pola."})
      return false
    }
    if(this.state.textInput.length < 10){
      this.setState({...this.state, err: "Tekst ciekawostki nie moze byc krotszy niz 10 znakow."})
      return false
    }
    if(this.state.categoryInput.length < 3 && this.state.selectValue === "-"){
      this.setState({...this.state, err: "Kategoria ciekawostki musi miec przynajmniej 3 znaki."})
      return false
    }
    const payload = {
      text: this.state.textInput,
      category: this.state.selectValue === "-" ? this.state.categoryInput : this.state.selectValue,
      tags: this.state.tags,
      factId: this.state.edit ? this.props.properties.factId : "",
      img: this.state.img
    }
    const url = this.state.edit ? "/api/fact/update" : '/api/fact/add'
    axios.post(url, payload).then((response) => {
      if(response.data.success){
        if(this.state.edit){
          this.props.properties.callback(response.data.payload, this.props.properties.catCount)
        }else{ 
          this.setState({...this.state, textInput: "", categoryInput: "", tags: [], err: "", img: "", showDone: true})
          setTimeout(() => {
            this.setState({...this.state, showDone: false})
          }, 5000)
        }
      }
    });
  }
  handleSelect(e){
    this.setState({...this.state, selectValue: e.target.value, categoryInput: ""})
  }
  convertImage = (file) => {
    return new Promise((resolve, reject) => {
      // create base64 string from image file
      let reader = new FileReader()
      reader.onload = (e) => {
        let imgUrl = e.target.result
        resolve(imgUrl)
      }
      reader.readAsDataURL(file)
    })
  }
  handleFileInput(e){
    let file = e.target.files[0]
    this.convertImage(file).then(base64 => {
      this.setState({...this.state, img: base64})
    })
  }
  render() {
      return (
        <Wrapper>
          {
            this.state.edit ?
            <button className="cancel" onClick={() => this.props.properties.callback(null)}>Anuluj</button>
            :
            <h1>Dodaj ciekawostke</h1>
          }
          <div className="section">
            <span>Zdjecie ciekawostki</span>
            <input className="imageInput" onChange={(e) => this.handleFileInput(e)} type="file"></input>
            {this.state.img === "" ? <div /> : <button onClick={() => this.setState({...this.state, img: ""})} className="deleteImage">Usun zdjecie</button>}
            {this.state.img === "" ? <div /> : <img className="image" src={this.state.img} />}
          </div>
          <div className="section">
            <span>Tekst ciekawostki:</span>
            <textarea onChange={(e) => this.handleInput(e, "text")} value={this.state.textInput}></textarea>
          </div>
          <div className="section">
            <span>Kategoria ciekawostki:</span>
            <span className="info">(stworz nowa kategorie lub wybierz istniejaca)</span>
            <input onChange={(e) => this.handleInput(e, "category")} value={this.state.categoryInput}></input>
            <select value={this.state.selectValue} onChange={(e) => this.handleSelect(e)}>
              <option key="2137" value="-">-</option>
              {this.state.categories.map((c, i) => {
                return (
                  <option key={i} value={c}>{c}</option>
                )
              })}
            </select>
          </div>
          <div className="section tags">
            <span>Tagi:</span>
            <span className="info">(zatwierdz klawiszem enter lub przyciskiem)</span>
            <input onChange={(e) => this.handleInput(e, "tag")} onKeyUp={(e) => this.handleKeyUp(e.keyCode)} value={this.state.tagInput}></input>
            <button onClick={() => this.addTag()}>Dodaj tag +</button>
            <div className={"tagList" + (this.state.edit ? " edit" : "")}>
              {this.state.tags.map((t, i) => {
                return (
                  <div key={i} className="tag">
                    <div onClick={() => this.setState({...this.state, tags: this.state.tags.filter(tg => tg !== t)})} className="deleteTag">
                      x
                    </div>
                    {t}
                  </div>
                )
              })}
            </div>
          </div>
          <span className="errMessage">{this.state.err}</span>
          {this.state.showDone ?
            <div className="done">
              Ciekawostka zostala dodana.
            </div>
            :
            <div />
          }
          <button className="addFactButton" onClick={() => this.addFact()}>{this.state.edit ? "Zaktualizuj ciekawostke" : "Dodaj ciekawostke"}</button>
        </Wrapper>
     )
   }
}

export default AddFacts
