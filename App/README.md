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
Run npm install from the chatty_server folder

#### Dependencies:
  - express: 4.16.4
  - node-fetch: ^2.2.0
  - uuid: ^3.3.2
  - ws: 6.1.0

## Screenshots and Functionality
!["Overall View"](https://github.com/mckittrickmark/tweeter/blob/master/public/images/Screen%20Shot%202018-10-12%20at%205.53.58%20PM.png)


## Other
This project is based on a boilerplate example here: lighthouse-labs/react-simple-boilerplate.git









A minimal and light dev environment for ReactJS.

### Usage

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
