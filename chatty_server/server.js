// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

var primaryAndYellow = ['#FF0000', '#00FF00',   '#0000FF', '#999900']
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// need to implement broadcast message function to generally broadcast anything back


wss.on('connection', (ws) => {
  console.log('Client connected');
  const color = primaryAndYellow[Math.floor(Math.random() * 4)]
  console.log("COLOR", color)
  const userInfoObj = {userCount: wss.clients.size, type:'userInfo', color: color}
  console.log("userInfoObj", userInfoObj)

  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(userInfoObj));
  });

  ws.on('message', function incoming(data) {
    const incomingMessage = JSON.parse(data)
    if (incomingMessage.type === 'postMessage'){
      incomingMessage.id = uuid()
      incomingMessage.type = 'incomingMessage'
      console.log("incoming message", incomingMessage)
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(incomingMessage));
      });
    } else if (incomingMessage.type === 'postNotification') {
      incomingMessage.type = 'incomingNotification'
      incomingMessage.id = uuid()

      wss.clients.forEach(function each(client) {
       client.send(JSON.stringify(incomingMessage));
      })
    } else {
      console.log('Unrecognized type')
    }


  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    const userCountObj = {userCount: wss.clients.size, type:'userCount'}


    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(userCountObj));
    });
  });
});