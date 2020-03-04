import React, { Component } from 'react'
import './auth.scss';
import Logo from '../../assets/images/dark_logo_web.png';
import { NavLink } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    handleSubmit = (e) => {
        const { email, password } = this.state;
        e.preventDefault();
        if (email !== '' && password !== '') {
            this.props.history.push('/');
        }        
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        return (
            <div className="auth-page valign-wrapper">
                <div className="container">
                     <div className="row">
                         <div className="col s12 l6 center">
                             <img src={ Logo } alt="Sqilly logo" className="responsive-img logo-img" />
                         </div>                     
                     </div>
                     <div className="row">
                         <div className="col s12 l6">
                             <h4 className="auth-title">Logowanie</h4>
                         </div>
                     </div>
                     <div className="section"></div>
                     <form onSubmit={ this.handleSubmit }>
                        <div className="row no-bottom-margin">
                            <div className="col s12 l6 input-field">
                                <i className="material-icons prefix">email</i>
                                <input type="email" id="email" onChange={ this.handleChange } value={ this.state.email } className="validate" />
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="Podany adres email jest nieprawidłowy"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 l6 input-field">
                                <i className="material-icons prefix">lock</i>
                                <input type="password" id="password" onChange={ this.handleChange } value={ this.state.password } />
                                <label htmlFor="password">Hasło</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 l6">
                                <span>Nie pamiętasz hasła?</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 l6">
                                <button type="submit" className="btn waves-effect red darken-1" onClick={ this.handleLogin } >Zaloguj się</button>
                                <NavLink to="/signup">
                                    <button className="btn-flat waves-effect waves-red red-text darken-1">Załóż konto</button>
                                </NavLink>
                            </div>
                        </div>
                     </form>
                </div>            
            </div>
        )
    }    
}

export default Login
