import React, { Component } from "react";
import Message from "./Message.jsx";


export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: this.props.messages
    }
  }


  render () {
    const messagesMapped = this.props.messages.map(messageTo => (
      <Message message={messageTo} key={messageTo.id}/>
    ))

    return (
      <main className="messages">
      {messagesMapped}
        <div className="message system">
        </div>
      </main>
      )
  }


}