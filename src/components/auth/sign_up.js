import React, { Component } from 'react'
import './auth.scss';
import Logo from '../../assets/images/dark_logo_web.png';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        validatePassword: '',        
    }
    componentDidMount() {
        var selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }
    handleSubmit = (e) => {
        const { name, email, password, validatePassword } = this.state;
        e.preventDefault();
        if (name === '' || password === '' || email === '' || validatePassword === '') {
            alert('Błąd: Wszystkie pola muszą być wypełnione');
        } else if (password !== validatePassword) {
            alert('Błąd: Podane hasła różnią się');
        } else {
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
                             <h4 className="auth-title">Rejestracja</h4>
                         </div>
                     </div>
                     <div className="section"></div>
                     <form onSubmit={ this.handleSubmit }>
                        <div className="row no-bottom-margin">
                            <div className="col s12 l6 input-field">
                                <i className="material-icons prefix">person</i>
                                <input type="text" id="name" onChange={ this.handleChange } value={ this.state.name } />
                                <label htmlFor="name">Nazwa konta</label>                                
                            </div>
                        </div>
                        <div className="row no-bottom-margin">
                            <div className="col s12 l6 input-field">
                                <i className="material-icons prefix">email</i>
                                <input type="email" id="email" onChange={ this.handleChange } value={ this.state.email } className="validate" />
                                <label htmlFor="email">Email</label>                                
                            </div>
                        </div>
                        <div className="row no-bottom-margin">
                            <div className="col s12 l6 input-field">
                                <i className="material-icons prefix">lock</i>
                                <input type="password" id="password" onChange={ this.handleChange } value={ this.state.password } />
                                <label htmlFor="password">Hasło</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 l6 input-field">
                                <i className="material-icons prefix">lock</i>
                                <input type="password" id="validatePassword" onChange={ this.handleChange } value={ this.state.validatePassword } />
                                <label htmlFor="validatePassword">Potwierdź hasło</label>
                                <span className="helper-text">* Hasło powinno składać się z conajmniej 6 znaków</span>
                            </div>
                        </div>                        
                        <div className="row">
                            <div className="col s12 l6">
                                <span>Masz już konto? <NavLink to="/login"><span className="login-text">Zaloguj się</span></NavLink></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 l6">
                                <button type="submit" className="btn waves-effect red darken-1" onClick={ this.handleLogin }>Załóż konto</button>                                
                            </div>
                        </div>
                     </form>
                </div>            
            </div>
        )
    }    
}

export default SignUp
