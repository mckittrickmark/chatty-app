import React, {Component} from 'react';
import '../styles/application.scss'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'

//Top-level component to be rendered

class App extends Component {
  // this is the only component with state in the App

  constructor(props) {
    super(props);
    this.state = {
            currentUser: {name: "", color: "", colorLabel: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
    userCount: 0
    }

    // Three helper functions that are passed into the object this.trx
    // The three functions Change colors, add messages, and change usernames
    const _addMessage = ({usernameInput, contentInput, type, imageInput}) => {
      const buildMessage = {
        username: usernameInput,
        content: contentInput,
        type: type,
        imageInput: imageInput,
        color: this.state.currentUser.color
      }

      this.socket.send(JSON.stringify(buildMessage))
    }
    const _changeUsername = (currentUser) => {
      const oldUsername = this.state.currentUser.name ? this.state.currentUser.name : "Anonymous";
      const newUsername = currentUser.name;
      const content = `${oldUsername} changed their name to ${newUsername}`;
      const type = 'postNotification';

      const buildNotification = {
          content: content,
          type: type
      }

      currentUser.colorLabel = this.state.currentUser.colorLabel;

      this.setState({currentUser: currentUser});

      this.socket.send(JSON.stringify(buildNotification));
    }

    const _changeColor = (newColor) => {
      const name = this.state.currentUser.name;
      const color = newColor.value;
      const colorLabel = newColor.label;

      const currentUser = { name: name, color: color, colorLabel: colorLabel};
      this.setState({currentUser: currentUser});
    }

    this.trx = {_addMessage: _addMessage,
                _changeUsername: _changeUsername,
                _changeColor: _changeColor}
  }

  // connection to websocket is performed in the componentDidMount callback
  //
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type:'incomingMessage', color:'#0000FF', imageInput:""};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    // Creating web socket
    this.socket = new WebSocket("ws://localhost:3001")

    // Verifying that the connection has been opened
    this.socket.onopen = (event) => {
      console.log("Opened")
    }

    // handles all messages from the Web Socket
    this.socket.onmessage = (messageIncoming) => {
      const parsedIncoming = JSON.parse(messageIncoming.data)

      // There are two types of messages 1) userInfo - that contains color and user count info 2) message info that receives messages from the server
      if (parsedIncoming.type === 'userInfo') {

        // Checking if color information is included. If color information is included, then the currentUser information needs to be updated
        if (parsedIncoming.color && this.state.userCount === 0) {
          this.setState({userCount: parsedIncoming.userCount,
                        currentUser:{ name: this.state.currentUser.name,
                                      color: parsedIncoming.color.value,
                                      colorLabel: parsedIncoming.color.label}})
        } else {
          this.setState({userCount: parsedIncoming.userCount})
        }
      } else {
        const messages = this.state.messages.concat(parsedIncoming)
        this.setState({messages})
      }
    }
  }
  // This is the main render function for the app
  render() {
    return (
    <div>
      <Navbar userCount={this.state.userCount} />
      <MessageList messages={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} trx={this.trx}/>
    </div>
    );
  }

}
export default App;
