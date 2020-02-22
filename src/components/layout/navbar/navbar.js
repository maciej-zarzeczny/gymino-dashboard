import React from "react";
import logo from '../../../assets/images/dark_logo_web.png';

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper white">
        <a href="/" className="brand-logo"><img src={logo} alt="Sqilly logo" className="navbar-logo" /></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
