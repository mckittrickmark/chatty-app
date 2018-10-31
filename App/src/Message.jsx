import React, { Component } from "react";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message
    }
  }
  render() {
    const imageDisplay = this.props.message.imageInput !== null &&
    (<div className='message-image-container'><img className="message-image" src={this.props.message.imageInput} /></div>)

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
