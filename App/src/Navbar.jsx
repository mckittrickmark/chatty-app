import React, { Component } from "react";

// userCount is broadcast from the server and kept in state in app.jsx each time any user connections starts or ends.
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-user-count">{this.props.userCount} users online</p>
      </nav>)
  }
}