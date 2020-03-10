import React from "react";
import "./navbar.scss";
import { withRouter } from 'react-router-dom';
import profilePic from "../../../assets/images/kura_1.jpg";
import { connect } from 'react-redux'

function Navbar(props) {    
  const { location, name } = props;    
  if (location.pathname.match('/login') || location.pathname.match('/signup') || location.pathname.match('/404')) {
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
                  <span className="username">{ name }</span>
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

function mapStateToProps(state) {
  return {
    name: state.firebase.profile.name
  }
}

export default connect(mapStateToProps)(withRouter(Navbar));
