import React, { Component } from "react";


// notification class is one of two message types that are contained in the messages array and
// housed in the messageList class
export default class Notification extends Component {
  render() {
    return (<div className="notification">
              <span className="notification-content">{this.props.notification.content} </span>
            </div>
      )
  }
}