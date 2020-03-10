import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../../assets/images/light_logo_web.png';
import "./menu.scss";
import { signOut } from '../../../redux/actions/auth_actions'
import { connect } from 'react-redux'

function Menu(props) {
    const { location, signOut } = props;
    if (location.pathname.match('/login') || location.pathname.match('/signup') || location.pathname.match('/404')) {
        return null;
    } else {
        return (
            <ul className="sidenav sidenav-fixed" id="menu-sidenav">
                <li className="center">
                    <NavLink to="/">
                        <img src={ logo } alt="Sqilly logo" className="logo" />
                    </NavLink>
                </li>
                <li>            
                    <div className="row valign-wrapper sidenav-link">
                        <div className="col s11">
                            <NavLink to="/" exact={true} activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">assessment</i>Panel</NavLink>
                        </div>
                        <div className="col auto">
                            <i className="material-icons small right btn-icon">chevron_right</i>
                        </div>
                    </div>                        
                </li>
                <div className="divider"></div>
                <li className="sidenav-title">
                    <span className="title">TRENINGI</span>
                </li>
                <li>
                    <div className="row valign-wrapper sidenav-link">
                        <div className="col s11">
                            <NavLink to="/workouts" activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">format_list_bulleted</i>Wszystkie treningi</NavLink>
                        </div>
                        <div className="col auto">
                            <i className="material-icons small right btn-icon">chevron_right</i>
                        </div>
                    </div>         
                </li> 
                <li>
                    <div className="row valign-wrapper sidenav-link">
                        <div className="col s11">
                            <NavLink to="/add-workout" activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">add_box</i>Dodaj trening</NavLink>
                        </div>
                        <div className="col auto">
                            <i className="material-icons small right btn-icon">chevron_right</i>
                        </div>
                    </div>         
                </li>
                <div className="divider"></div>
                <li className="sidenav-title">
                    <span className="title">USTAWIENIA</span>
                </li>
                <li>
                    <div className="row valign-wrapper sidenav-link">
                        <div className="col s11">
                            <NavLink to="/edit-data" activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">edit</i>Edytuj dane</NavLink>
                        </div>
                        <div className="col auto">
                            <i className="material-icons small right btn-icon">chevron_right</i>
                        </div>
                    </div>         
                </li>
                <li>
                    <div className="row valign-wrapper sidenav-link">
                        <div className="col s11">
                            <a onClick={ signOut } className="valign-wrapper" href="#!"><i className="material-icons left">power_settings_new</i>Wyloguj się</a>
                        </div>
                        <div className="col auto">
                            <i className="material-icons small right btn-icon">chevron_right</i>
                        </div>
                    </div>         
                </li>
            </ul>
        );    
    }    
}

const mapDispatchToProps = (dispatch) => {    
    return {
        signOut: () => dispatch(signOut())   
    }    
}

export default connect(null, mapDispatchToProps)(withRouter(Menu));
