import React, { Component } from "react";

export default class ChatBar extends Component {

  render () {
    const currentUser = this.props.currentUser

    return ( <footer className="chatbar" >
        <input className="chatbar-username" id='username'  placeholder={this.props.currentUser.name} onKeyDown={this._keyPress}/>
        <input className="chatbar-message" id='content' onKeyDown={this._keyPress} />
      </footer>)
  }

  _keyPress = (e) => {
    if(e.keyCode == 13){
      if (e.target.id === 'content') {
        this._makeMessage(e)
      } else if (e.target.id === 'username'){
        this._changeUsername(e)
      }
    }

  }
  // If user is not defined, should default to anonomous
  _makeMessage = (e) => {
    console.log("currentUser Name", this.props.currentUser.name)
    let username = ""
    if (this.props.currentUser.name.length <= 0) {
      username = 'anonymous'
    } else {
      username = this.props.currentUser.name
    }
    console.log("USERNAME 1", username)
    const content = e.target.value
    const messageObj = {usernameInput: username, contentInput: content}
    this.props.trx._addMessage(messageObj)
    e.target.value = ""
  }
  _changeUsername = (e) => {
    const name = e.target.value
    const currentUser = {name: name}
    this.props.trx._changeUsername(currentUser)
  }
}
