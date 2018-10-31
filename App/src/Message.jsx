import React, { Component } from "react";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    }
  }
  render() {
    return (<div className="message">
              <span className="message-username">{this.state.message.username}</span>
              <span className="message-content">{this.state.message.content}</span>
            </div>
      )
  }
}
