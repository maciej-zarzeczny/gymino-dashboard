import React, { Component } from 'react'
import './edit_data.scss'
import M from 'materialize-css'
import NewSupplementModal from './new_supplement_modal'
import PowderImage from '../../assets/images/powder.jpg'
import PillsImage from '../../assets/images/pills.jpg'
import { connect } from 'react-redux'
import { updateUserData } from '../../redux/actions/user_actions'
import FullPagePreloader from '../layout/preloader/full_page_preloader'

class EditData extends Component {
    state = {
        image: null,
        imageUrl: null,
        name: '',
        email: '',
        gender: '',
        trainingType: '',
        age: '',
        weight: '',
        height: '',
        trainingTime: '',
        dataChanged: false,
        supplements: [],
        initialValuesSet: false
    }
    componentDidMount() {        
        var modal = document.querySelectorAll('.modal');        
        M.Modal.init(modal);
        
        if (this.props.user.name !== undefined) {
            this.setInitialValues();            
        }        
    }
    componentDidUpdate(prevProps, prevState) {        
        if (!this.state.initialValuesSet && this.props.user.name !== undefined) {
            this.setInitialValues();               
        }        
        if (!prevState.initialValuesSet && this.state.initialValuesSet) {
            var selects = document.querySelectorAll('.select-field');
            M.FormSelect.init(selects);            
        }               
    }
    setInitialValues() {
        var trainingType = ''
        if (this.props.user.gym && this.props.user.calisthenics) {
            trainingType = '3'
        } else if (this.props.user.calisthenics) {
            trainingType = '2'
        } else if (this.props.user.gym) {
            trainingType = '1'
        } else {
            trainingType = '0'
        }

        var age = this.props.user.age ? this.props.user.age : '' 
        var weight = this.props.user.weight ? this.props.user.weight : '' 
        var height = this.props.user.height ? this.props.user.height : '' 
        var trainingTime = this.props.user.trainingTime ? this.props.user.trainingTime : '' 
        var supplements = this.props.user.supplements ? this.props.user.supplements : [] 
        var imageUrl = this.props.user.image ? this.props.user.image : null       

        this.setState({
            name: this.props.user.name,
            email: this.props.email,
            gender : this.props.user.gender,
            imageUrl,
            trainingType,
            age,
            weight,
            height,
            trainingTime,
            supplements,
            initialValuesSet: true,                        
        })        
    }
    handleImageChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                imageUrl: URL.createObjectURL(e.target.files[0]),
                dataChanged: true
            });
        }        
    }
    handleInputChange = (e) => {
        this.setState({
            dataChanged: true
        })        
        switch (e.target.id) {
            case 'username-field':
                this.setState({
                    name: e.target.value
                });
                break;
            case 'email-field':
                this.setState({
                    email: e.target.value
                });
                break;
            case 'gender-select':
                this.setState({
                    gender: parseInt(e.target.value)
                });
                break;
            case 'training-type-select':
                this.setState({
                    trainingType: e.target.value
                })                
                break;
            case 'age-field':                        
                this.setState({
                    age: e.target.value === '' ? '' : parseInt(e.target.value)
                });                
                break;
            case 'weight-field':
                this.setState({
                    weight: e.target.value === '' ? '' : parseInt(e.target.value)
                });
                break;
            case 'height-field':
                this.setState({
                    height: e.target.value === '' ? '' : parseInt(e.target.value)
                });
                break;
            case 'training-duration-field':
                this.setState({
                    trainingTime: e.target.value === '' ? '' : parseInt(e.target.value)
                });
                break;

            default:                                  
                break;
        }
    }
    handleSaveButton = () => {
        const { name, email, age, weight, height, trainingTime, trainingType, gender, supplements, image, imageUrl } = this.state;
        if (name === '' || email === '' || age === '' || weight === '' || height === '' || trainingTime === '' || trainingType === 0 || gender === 0) {
            alert('Błąd: Wszystkie pola muszą być wypełnione');
        } else if (age <= 0 || weight <= 0 || height <= 0 || trainingTime <= 0) {
            alert('Błąd: Wprowadzone wartości muszą być większe od zera');
        } else if (image === null && imageUrl === null) {
            alert ('Błąd: Dodaj zdjęcie profilowe')
        } else {
            this.setState({
                dataChanged: false
            });

            this.props.updateUserData({
                name,
                gender,
                age,
                weight,
                height,
                trainingTime,
                trainingType,
                supplements,
                image
            })
        }        
    }
    addSupplement = (supplement) => {
        const { supplements } = this.state;
        let id = supplements.length > 0 ? supplements[supplements.length - 1].id + 1 : 1;        
        supplement.id = id;
        let newSupplements = [...supplements, supplement];

        this.setState({
            supplements: newSupplements,
            dataChanged: true
        });
    }
    removeSupplement = (id) => {
        let supplements = this.state.supplements.filter((supplement) => {
            return supplement.id !== id;
        });

        this.setState({
            supplements,
            dataChanged: true
        });
    }
    render() {           
        const preloader = this.props.isLoading && (
            <FullPagePreloader />
        )       
        const supplementsList = this.state.supplements.length > 0 ? this.state.supplements.map((supplement) => {
            let unit = '';
            if (supplement.unit === 1) {
                unit = 'ug';
            } else if (supplement.unit === 2) {
                unit = 'mg';
            } else {
                unit = 'g';
            }
            
            return (
                <div className="card-panel" key={ supplement.id }>
                    <div className="row no-bottom-margin valign-wrapper">
                        <div className="col s2 l1">
                        <img src={ supplement.form === 1 ? PowderImage : PillsImage } alt={ supplement.name } className="supplement-img" />
                        </div>
                        <div className="col s4 l5">
                            <span className="supplement-name">{ supplement.name }</span>
                        </div>
                        <div className="col s4 l5">
                            <span className="supplement-name">{ supplement.amount + ' ' + unit + ' x ' + supplement.portionsPerDay + ' dziennie' }</span>
                        </div>
                        <div className="col s2 l1">
                            <a href="#!" onClick={ () => this.removeSupplement(supplement.id) }><i className="material-icons red-text darken-1 small right">delete</i></a>
                        </div>                        
                    </div>
                </div>  
            );
        }) : (
            <p>Brak dodanych suplementów</p>
        );        
        return (
            <div className="wrapper">
                <div className="row valign-wrapper edit-data-header">
                    <div className="col s6">                
                        <h4>Edytuj swoje dane</h4>
                    </div>
                    <div className="col s6">
                        { 
                            this.state.dataChanged && (<button onClick={ this.handleSaveButton } className="btn waves-effect right pulse">Zapisz</button>)
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 xl6">
                        <p className="card-top-title">Informacje ogólne</p>
                        <div className="card-panel">
                            <div className="row general-info-form valign-wrapper">                                                            
                                <div className="col s12 xl6 center file-field input-field">
                                    { this.state.imageUrl ? (
                                            <img src={ this.state.imageUrl } alt="training" className="responsive-img profile-pic-img circle"/>
                                        ) : 
                                        (
                                            <i className="material-icons training-image-placeholder">add_a_photo</i>
                                        ) }
                                    <input type="file" onChange={ this.handleImageChange } />
                                </div>
                                <div className="col s12 xl6">
                                    <div className="row">
                                        <div className="col s12 input-field">                                            
                                            <input id="username-field" type="text" onChange={ this.handleInputChange } value={ this.state.name } />
                                            <label htmlFor="username-field" className="active">Nazwa użytkownika</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="email-field" type="text" onChange={ this.handleInputChange } value={ this.state.email } />
                                            <label htmlFor="email-field" className="active">Email</label>
                                        </div>
                                        <div className="col s12 input-field">
                                            <select id="gender-select" className="select-field" onChange={ this.handleInputChange } value={ this.state.gender } >
                                                <option value="0" disabled>Wybierz</option>
                                                <option value="1">Mężczyzna</option>
                                                <option value="2">Kobieta</option>
                                            </select>
                                            <label>Płeć</label>
                                        </div>
                                        <div className="col s12 input-field">
                                            <select id="training-type-select" className="select-field" onChange={ this.handleInputChange } value={ this.state.trainingType } >
                                                <option value="0" disabled>Wybierz</option>
                                                <option value="1">Siłownia</option>
                                                <option value="2">Kalistenika</option>
                                                <option value="3">Hybdrydowy</option>
                                            </select>
                                            <label>Rodzaj treningu</label>
                                        </div>                                        
                                    </div>                                        
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="col s12 xl6">
                        <p className="card-top-title">Informacje dodatkowe</p>
                        <div className="card-panel">
                        <div className="row general-info-form valign-wrapper">                                
                                <div className="col s12">
                                    <div className="row">
                                        <div className="col s12 input-field">                                            
                                            <input id="age-field" type="number" onChange={ this.handleInputChange } value={ this.state.age } />
                                            <label htmlFor="age-field" className="active">Wiek</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="weight-field" type="number" onChange={ this.handleInputChange } value={ this.state.weight } />
                                            <label htmlFor="weight-field" className="active">Waga (kilogramy)</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="height-field" type="number" onChange={ this.handleInputChange } value={ this.state.height } />
                                            <label htmlFor="height-field" className="active">Wzrost (centymetry)</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="training-duration-field" type="number" onChange={ this.handleInputChange } value={ this.state.trainingTime } />
                                            <label htmlFor="training-duration-field" className="active">Staż treningowy (lata)</label>
                                        </div>                                                 
                                    </div>                                        
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">                
                    <div className="col s12">
                        <p className="card-top-title">Stosowane suplementy</p>
                        { supplementsList }
                        <a href="#new-supplement-modal" className="btn btn-small waves-effect green darken-1 modal-trigger">Dodaj</a>
                    </div>
                </div>
                <NewSupplementModal addSupplement={ this.addSupplement } />       
                { preloader }         
            </div>
        )
    }    
}

function mapStateToProps(state) {
    return {
        user: state.firebase.profile,
        email: state.firebase.auth.email,
        isLoading: state.user.isLoading,        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserData: (data) => dispatch(updateUserData(data)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditData)
