import React, { Component } from "react";
//import DropdownColor from "./dropdown.jsx";

export default class ChatBar extends Component {

  render () {


    const currentUser = this.props.currentUser

    return ( <footer className="chatbar" >

        <input className="chatbar-username" id='username'  placeholder="Your Name (Optional)" onKeyDown={this._keyPress}/>
        <input className="chatbar-message" id='content' placeholder="Type a message and hit ENTER" onKeyDown={this._keyPress} />
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

    //loop through all the strings separated by " " to see if they are an image
    for (var i = 0; i < contentArray.length ; i++){
      if (imgExtension.includes(contentArray[i].slice(-3,))) {
        imageInput = contentArray[i]
        imagePresent = i
      }
    }
    // rebuild the array
    if (imagePresent >= 0) {
      contentArray.splice(imagePresent, 1)
      content = contentArray.join(' ')
    } else {
      content = contentArray.join(' ')
    }


    const type = "postMessage"
    const messageObj = {usernameInput: username, contentInput: content, type: type, imageInput: imageInput}
    this.props.trx._addMessage(messageObj)
    e.target.value = ""
  }
  _changeUsername = (e) => {
    const name = e.target.value
    const currentUser = {name: name, color:this.props.currentUser.color}
    this.props.trx._changeUsername(currentUser)
  }
}
