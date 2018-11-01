import React, { Component } from "react";
import DropdownColor from "./dropdown.jsx";


// Chatbar class originates all messages, username changes and color changes
export default class ChatBar extends Component {

  render () {
    const currentUser = this.props.currentUser

    return ( <footer className="chatbar" >
        <DropdownColor className="chatbar-dropdown" trx={this.props.trx} currentUser={this.props.currentUser}/>
        <input className="chatbar-username" id='username'  placeholder="Your Name (Optional)" onKeyDown={this._keyPress}/>
        <input className="chatbar-message" id='content' placeholder="Type a message and hit ENTER" onKeyDown={this._keyPress} />
        <button type="button" className="chatbar-gify" value="Random Gify" onClick={this._gifyMessage}>Random Gify</button>
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
  // If user is not defined, default is set to anonymous
  _makeMessage = (e) => {
    // imgExtension is the recognized image file extensions
    const imgExtension = ['jpg', 'png', 'gif']

    let username = ""
    let imageInput = null

    if (this.props.currentUser.name.length <= 0) {
      username = 'anonymous'
    } else {
      username = this.props.currentUser.name
    }

    let content = e.target.value
    let contentArray = content.split(' ')
    let imagePresent = -1

    //loop through all the strings separated by " " to see if they are an image file
    for (var i = 0; i < contentArray.length ; i++){
      if (imgExtension.includes(contentArray[i].slice(-3,))) {
        imageInput = contentArray[i]
        imagePresent = i
      }
    }
    // rebuild the array with the last image string moved to imageInput - Only one image file can be handled per message. Due to the loop overrwriting the variable. The last image file will be the only one rendered.
    if (imagePresent >= 0) {
      contentArray.splice(imagePresent, 1)
      content = contentArray.join(' ')
    } else {
      content = contentArray.join(' ')
    }

    // calling the trx helper function defined in app.jsx and setting the message input to ""
    const type = "postMessage"
    const messageObj = {usernameInput: username, contentInput: content, type: type, imageInput: imageInput}
    this.props.trx._addMessage(messageObj)
    e.target.value = ""
  }
  // calling the trx helper function defined in app.jsx and setting the message input to ""
  _changeUsername = (e) => {
    const name = e.target.value
    const currentUser = {name: name, color:this.props.currentUser.color}
    this.props.trx._changeUsername(currentUser)
  }

  _gifyMessage = (e) => {
    let username = ""
    let imageInput = null
    let content = ""
    let type = "gifyMessage"

    if (this.props.currentUser.name.length <= 0) {
      username = 'anonymous'
    } else {
      username = this.props.currentUser.name
    }

    const messageObj = {usernameInput: username, contentInput: content, type: type, imageInput: imageInput}

    this.props.trx._addMessage(messageObj)
  }

}



