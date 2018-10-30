import React, {Component} from 'react';
import '../styles/application.scss'
import Chatbar from './ChatBar.jsx'
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'



console.log(Chatbar)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
            currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [],
  maxId: 3
}
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
    console.log("SOCKET", this.socket)
    this.socket.onopen = (event) => {
      const msg = {text: "TESTING"}

      this.socket.send(JSON.stringify(msg))
      console.log("HERE!")
    }
  }
  render() {
    console.log("Messages in Render", this.state.messages)
    return (
    <div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} _addMessage={this._addMessage}/>
    </div>
    );
  }

  _addMessage = ({usernameInput, contentInput}) => {
    const buildMessage = {
        username: usernameInput,
        content: contentInput
    }
    const messages = this.state.messages.concat(buildMessage)
    this.socket.send(JSON.stringify(buildMessage))
  }

}
export default App;
