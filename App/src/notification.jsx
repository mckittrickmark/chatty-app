import React, { Component } from "react";

export default class Notification extends Component {
  render() {
    return (<div className="notification">
              <span className="notification-content">{this.props.notification.content} </span>
            </div>
      )
  }
}