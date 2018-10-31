import React, {Component} from 'react';
import '../styles/application.scss'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
            currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
    maxId: 3 // this is no longer use
    }

    const _addMessage = ({usernameInput, contentInput}) => {
      const buildMessage = {
        username: usernameInput,
        content: contentInput
      }
      const messages = this.state.messages.concat(buildMessage)
      this.socket.send(JSON.stringify(buildMessage))
    }
    const _changeUsername = (currentUser) => {
      console.log("current user", currentUser)
      this.setState({currentUser: currentUser})
    }

    this.trx = {_addMessage: _addMessage,
                _changeUsername: _changeUsername}
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log('OPENED IT UP')
    }
    this.socket.onmessage = (messageIncoming) => {
      const parsedIncoming = JSON.parse(messageIncoming.data)
      const messages = this.state.messages.concat(parsedIncoming)
      this.setState({messages})
    }
  }
  render() {
    console.log("Messages in Render", this.state.messages)
    return (
    <div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} trx={this.trx}/>
    </div>
    );
  }




}
export default App;
