import React, { Component } from 'react'
import './auth.scss';
import Logo from '../../assets/images/gymino_logo_dark.png';
import { NavLink } from 'react-router-dom';
import { signIn } from '../../redux/actions/auth_actions'
import { connect } from 'react-redux'
import FullPagePreloader from '../layout/preloader/full_page_preloader'

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    handleSubmit = (e) => {
        const { email, password } = this.state;
        e.preventDefault();
        if (email !== '' && password !== '') {
            this.props.signIn(this.state)
        } else {
            alert('Wprowadź wszystkie dane')
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        const { authError, isLoading } = this.props
        const preloader = isLoading && (
            <div className="row">
                <div className="col s12 l6">
                    <FullPagePreloader />
                </div>
            </div>
        )
        const errorText = authError && (
            <p className="help-text red-text darken-1">Logowanie nie powiodło się</p>
        )
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
                             { errorText }
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
                     { preloader }
                </div>                
            </div>
        )
    }    
}

function mapStateToProps(state) {
    return {
        isLoading: state.auth.isLoading,
        authError: state.auth.authError
    }    
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
