import React, { Component } from "react";
import "./navbar.scss";
import { withRouter } from 'react-router-dom';
import profilePic from "../../../assets/images/kura_1.jpg";

class Navbar extends Component {
  state = {
    username: "Kura Workout"
  };
  render() {    
    const { location } = this.props;
    if (location.pathname.match('/login') || location.pathname.match('/signup')) {
      return null;
    } else {
      return (
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper white">
              <a href="#!" data-target="menu-sidenav" className="sidenav-trigger">
                <i className="material-icons hamburger-icon">menu</i>
              </a>
              <ul className="right">
                <li>
                  <a href="/">
                    <span className="username">{this.state.username}</span>
                    <img src={profilePic} alt="Avatar" className="circle avatar" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>        
      );
    }    
  }
}

export default withRouter(Navbar);
