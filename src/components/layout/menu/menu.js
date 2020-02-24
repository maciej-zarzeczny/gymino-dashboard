import React from "react";
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/light_logo_web.png';
import "./menu.scss";

function Menu()  {        
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
                        <NavLink to="/trainings" activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">format_list_bulleted</i>Wszystkie treningi</NavLink>
                    </div>
                    <div className="col auto">
                        <i className="material-icons small right btn-icon">chevron_right</i>
                    </div>
                </div>         
            </li> 
            <li>
                <div className="row valign-wrapper sidenav-link">
                    <div className="col s11">
                        <NavLink to="/add_training" activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">add_box</i>Dodaj trening</NavLink>
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
                        <NavLink to="/edit_data" activeClassName="active-link" className="valign-wrapper"><i className="material-icons left">edit</i>Edytuj dane</NavLink>
                    </div>
                    <div className="col auto">
                        <i className="material-icons small right btn-icon">chevron_right</i>
                    </div>
                </div>         
            </li>
            <li>
                <div className="row valign-wrapper sidenav-link">
                    <div className="col s11">
                        <a href="#!" className="valign-wrapper"><i className="material-icons left">power_settings_new</i>Wyloguj</a>
                    </div>
                    <div className="col auto">
                        <i className="material-icons small right btn-icon">chevron_right</i>
                    </div>
                </div>         
            </li>
        </ul>
    );    
}

export default Menu;
