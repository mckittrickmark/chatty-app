import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

// messageList class contains all messages and notifications for Chatty
export default class MessageList extends Component {

  // This helper function scrolls the message list to the bottom. It is triggered on Mount and on Update
  scrollToBottom = () => {
    console.log(this.messagesEnd)
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // Messages and notifications are both rendered from incomingMapped
  render () {
    const incomingMapped = this.props.messages.map(messageTo => {
      return messageTo.type === 'incomingMessage' ?
        (<Message message={messageTo} key={messageTo.id}/>)
        :
        (<Notification notification={messageTo} key={messageTo.id} />)
    })

    return (
      <main className="messages">
        {incomingMapped}
        <div className="message system" style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </main>
      )
  }


}