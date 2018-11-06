import React, { Component } from "react";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    }
  }
  render() {
    // imageDisplay will display one image if there is an image input in the message, otherwise it will display nopthing. The image display is set in Chatbar.jsx
    const imageDisplay = this.props.message.imageInput !== null &&
    (<div className='message-image-container'><img className="message-image" src={this.props.message.imageInput} /></div>)

    // color is automatically randomly set on the server side on connection, afterwards color can be changed in the dropdown class in chatbar class
    const colorUser = this.props.message.color
    return (<div className="message">
              <div className="message-text-container">
                <span className="message-username" style={{color:colorUser}}>{this.props.message.username}</span>
                <span className="message-content">{this.props.message.content}</span>
              </div>
              {imageDisplay}
            </div>
      )
  }
}
