import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";


export default class MessageList extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    console.log("SCROLL TO BOTTOM")
    this.scrollToBottom();
  }

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
      <div style={{ float:"left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}>
      </div>
        <div className="message system">
        </div>
      </main>
      )
  }


}