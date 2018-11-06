// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const fetch = require('node-fetch');
const querystring = require('querystring');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Color list for random color selection
var primaryAndYellow = [{label: 'Red', value: '#FF0000'}, {label: 'Lime', value: '#00FF00'}, {label: 'Blue', value:'#0000FF'}, {label:'Brownish Yellow', value: '#999900'}]

// broadcast function for sending data out to all connected users
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  })
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// Starts connection generates random color and counts users
wss.on('connection', (ws) => {
  console.log('Client connected');
  const color = primaryAndYellow[Math.floor(Math.random() * 4)]
  const userInfoObj = {userCount: wss.clients.size, type:'userInfo', color: color}
  broadcast(userInfoObj)

// Receives messages from browsers, differentiates between message 'type' and calls broadcast to send to all connected users
  ws.on('message', function incoming(data) {
    const incomingMessage = JSON.parse(data)
    if (incomingMessage.type === 'postMessage'){
      incomingMessage.id = uuid()
      incomingMessage.type = 'incomingMessage'
      broadcast(incomingMessage)
    } else if (incomingMessage.type === 'postNotification') {
      incomingMessage.type = 'incomingNotification'
      incomingMessage.id = uuid()

      broadcast(incomingMessage)
    } else {
      // api_key wa previously stored in a separate non-shared file, but it doesn't really matter so I put it here.
      const qs = querystring.stringify({
        api_key: "vGmdqWKq4c2MYDkywlNOZC3inGEFucmA",
        tag: "cats"
      })
      fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
                .then( resp => resp.json())
                .then( json => {
                  incomingMessage.imageInput = json.data.image_original_url
                  incomingMessage.type = "incomingMessage"

                  broadcast(incomingMessage)
                })

      console.log('WHAT')
    }


  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    const userInfoObj = {userCount: wss.clients.size, type:'userInfo'}
    broadcast(userInfoObj)
  });
});