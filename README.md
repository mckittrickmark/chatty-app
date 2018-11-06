# Chatty - A chat app

## Features
- Send messages between multiple people using web sockets
- User can change thier username
- User is randomly assigned one of four colors (Red, blue, green, brownish-yellow) when connection is established with the server
- User can select a new color from a drop-down list (Red, blue, green, brownish-yellow)
- Text input field can recognize jpg, png, gif image and gif files
- Connected via API to giphy.com - can generate a random gif (only cats)


## Setup
To run this program. The client side (APP) and the server (chatty_server) need to be setup.

### App
Run npm install from the app folder
When you are ready to start the client, run npm start in the App directory.

#### Dependencies:
  - react: 15.4.2
  - react-dom: 15.4.2
  - react-dropdown: ^1.6.2
  - ws: 6.1.0

#### Dev Dependencies:
  - babel-core: "6.23.1",
  - babel-loader: "6.3.1",
  - babel-preset-es2015: "6.22.0",
  - babel-preset-react: "6.23.0",
  - babel-preset-stage-0: "6.22.0",
  - css-loader: 0.26.1
  - eslint: 3.15.0
  - eslint-plugin-react: 6.9.0
  - node-sass: 4.5.0
  - sass-loader: 6.0.0
  - sockjs-client: ^1.1.2
  - style-loader: 0.13.1
  - webpack: 2.2.1
  - webpack-dev-server: 2.3.0


### chatty_server
Run npm install from the chatty_server folder to load the required dependencies.
When you are ready to start the server, run npm start in the chatty-server directory.

#### Dependencies:
  - express: 4.16.4
  - node-fetch: ^2.2.0
  - uuid: ^3.3.2
  - ws: 6.1.0

## Screenshots and Functionality
!["Overall View"](https://github.com/mckittrickmark/chatty-app/blob/master/app/build/pictures/Screen%20Shot%202018-11-01%20at%202.12.06%20PM.png)
The overall view allows users to see all messages posted to the chat. Upon receiving a new message the screen will scroll to the bottom. Username colors are consistent between different user sesssions.

!["Chatbar"](https://github.com/mckittrickmark/chatty-app/blob/master/app/build/pictures/Screen%20Shot%202018-11-01%20at%202.12.16%20PM.png)
The chatbar has four inputs 1) color selection (for username) 2) Username selection 3) Text field (which also accepts jpg, png, gif) 4) Random Gif (only cats)

!["Navbar"](https://github.com/mckittrickmark/chatty-app/blob/master/app/build/pictures/Screen%20Shot%202018-11-01%20at%202.12.27%20PM.png)
The Navbar has a link to this page (which is wholly redundant as a SPA) and a count of the users connected, so if you talk to yourself, you can do it intentionally.

## Other
This project is based on a boilerplate example here: lighthouse-labs/react-simple-boilerplate.git


