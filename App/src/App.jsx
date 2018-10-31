import React, {Component} from 'react';
import '../styles/application.scss'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
            currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
    userCount: 0,
    maxId: 3 // this is no longer use
    }

    const _addMessage = ({usernameInput, contentInput, type, imageInput}) => {
      const buildMessage = {
        username: usernameInput,
        content: contentInput,
        type: type,
        imageInput: imageInput,
        color: this.state.currentUser.color
      }
      const messages = this.state.messages.concat(buildMessage)
      this.socket.send(JSON.stringify(buildMessage))
    }
    const _changeUsername = (currentUser) => {
      const oldUsername = this.state.currentUser.name
      const newUsername = currentUser.name
      const content = `${oldUsername} changed their name to ${newUsername}`
      const type = 'postNotification'

      const buildNotification = {
          content: content,
          type: type
      }

      this.setState({currentUser: currentUser})

      this.socket.send(JSON.stringify(buildNotification))
    }

    this.trx = {_addMessage: _addMessage,
                _changeUsername: _changeUsername}
  }
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
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
    }
    this.socket.onmessage = (messageIncoming) => {
      const parsedIncoming = JSON.parse(messageIncoming.data)
      if (parsedIncoming.type === 'userInfo') {
        this.setState({userCount: parsedIncoming.userCount,
                      currentUser:{ name: this.state.currentUser.name,
                                    color: parsedIncoming.color}})
      } else {
        const messages = this.state.messages.concat(parsedIncoming)
        this.setState({messages})
      }
    }
  }
  render() {
    console.log("Messages in Render", this.state.messages)
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
