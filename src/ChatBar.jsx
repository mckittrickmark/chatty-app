import React, { Component } from "react";

export default class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      content: ""
    }
  }



  render () {
    const currentUser = this.props.currentUser

    const _onChange = (event) => {
      console.log("THIS",this)
      this._changeValue(event.target.value, event.target.id)
    }

    return ( <footer className="chatbar" onKeyDown={this._keyPress}>
        <input className="chatbar-username" id='username'  value={this.state.username} onChange={_onChange}/>
        <input className="chatbar-message" id='content' value={this.state.content} onChange={_onChange}/>
      </footer>)
  }

  _keyPress = (e) => {
    if(e.keyCode == 13){
      if(this.state.content.length > 0 && this.state.username.length > 0){
        this._makeMessage(e)
      }
    }

  }
  _makeMessage = (e) => {
    const username = this.state.username
    const content = this.state.content
    const messageObj = {usernameInput: username, contentInput: content}
    this.props._addMessage(messageObj)
    this.setState({content: ""})
  }
  _changeValue(inputValue, field) {
    const messageObj = {}
    messageObj[field] = inputValue
    this.setState(messageObj)
  }
}
