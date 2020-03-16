import React from "react";
import "./navbar.scss";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { Sidenav } from 'materialize-css';
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {  
  componentDidMount() {
    var elems = document.querySelectorAll('.sidenav');
    Sidenav.init(elems);    
  }
  render() {    
    const { location, user } = this.props;
    const profilePic = user.image ? (
      <img src={ user.image } alt="Avatar" className="circle avatar" />
    ) : (
      <div></div>
    )
    if (location.pathname.match('/login') || location.pathname.match('/signup') || location.pathname.match('/404')) {
      return null;
    } else {
      return (
        <div>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper white">
                <a href="#!" data-target="menu-sidenav" className="sidenav-trigger">
                  <i className="material-icons hamburger-icon">menu</i>
                </a>
                <ul className="right">
                  <li>
                    <NavLink to="/">
                      <span className="username">{ user.name }</span>
                      { profilePic }
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>              
        </div>
      );
    }
  }      
}

function mapStateToProps(state) {
  return {
    user: state.firebase.profile,
  }
}

export default connect(mapStateToProps)(withRouter(Navbar));
