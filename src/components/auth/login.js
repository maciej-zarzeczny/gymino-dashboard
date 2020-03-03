import React from 'react'
import './auth.scss';
import Logo from '../../assets/images/dark_logo_web.png';

function Login() {
    return (
        <div className="auth-page valign-wrapper">
            <div className="container">
                 <div className="row">
                     <div className="col s6 center">
                         <img src={ Logo } alt="Sqilly logo" className="responsive-img logo-img" />
                     </div>                     
                 </div>
                 <div className="row">
                     <div className="col s6">
                         <h4 className="auth-title">Logowanie</h4>
                     </div>
                 </div>
                 <div className="section"></div>
                 <div className="row">
                     <div className="col s6 input-field">
                        <i className="material-icons prefix">email</i>
                        <input type="email" id="email" />
                        <label htmlFor="email">Email</label>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col s6 input-field">
                        <i className="material-icons prefix">lock</i>
                        <input type="password" id="password" />
                        <label htmlFor="password">Hasło</label>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col s6">
                         <span>Nie pamiętasz hasła?</span>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col s6">
                         <a href="#!" className="btn waves-effect red darken-1">Zaloguj się</a>
                         <a href="#!" className="btn-flat waves-effect waves-red red-text darken-1">Załóż konto</a>
                     </div>
                 </div>
            </div>            
        </div>
    )
}

export default Login
