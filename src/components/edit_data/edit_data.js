import React, { Component } from 'react'
import './edit_data.scss';
import M from 'materialize-css';
import NewSupplementModal from './new_supplement_modal';

class EditData extends Component {
    state = {
        image: null,
        name: '',
        email: '',
        gender: '',
        calisthenics: false,
        gym: false,
        age: '',
        weight: '',
        height: '',
        trainingDuration: '',
        dataChanged: false,
        supplements: [{ id: 1, name: 'Kreatyna', form: 1, amount: 5, unit: 'g', portionsPerDay: 1 }],
    }
    componentDidMount() {
        var selects = document.querySelectorAll('.select-field');
        var modal = document.querySelectorAll('.modal');
        M.FormSelect.init(selects);
        M.Modal.init(modal);
    }
    handleImageChange = (e) => {
        this.setState({
            image:  URL.createObjectURL(e.target.files[0])
        });
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
                    gender: parseInt(e.target.value - 1)
                });
                break;
            case 'training-type-select':
                let trainingType = parseInt(e.target.value);
                if (trainingType === 1) {
                    this.setState({
                        gym: true,
                        calisthenics: false
                    })
                } else if (trainingType === 2) {
                    this.setState({
                        gym: false,
                        calisthenics: true
                    })
                } else {
                    this.setState({
                        gym: true,
                        calisthenics: true
                    })
                }                
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
                    trainingDuration: e.target.value === '' ? '' : parseInt(e.target.value)
                });
                break;

            default:                                  
                break;
        }
    }
    handleSaveButton = () => {        
        const { name, email, age, weight, height, trainingDuration, calisthenics, gym } = this.state;
        if (name === '' || email === '' || age === '' || weight === '' || height === '' || trainingDuration === '' || (!calisthenics && !gym)) {
            alert('Błąd: Wszystkie pola muszą być wypełnione');
        } else if (age <= 0 || weight <= 0 || height <= 0 || trainingDuration <= 0) {
            alert('Błąd: Wprowadzone wartości muszą być większe od zera');
        } else {
            this.setState({
                dataChanged: false
            });
            console.log(this.state);
        }        
    }
    addSupplement = (supplement) => {
        const { supplements } = this.state;
        let id = supplements.length > 0 ? supplements[supplements.length - 1].id + 1 : 1;        
        supplement.id = id;
        let newSupplements = [...supplements, supplement];

        this.setState({
            supplements: newSupplements
        });
    }
    removeSupplement = (id) => {
        let supplements = this.state.supplements.filter((supplement) => {
            return supplement.id !== id;
        });

        this.setState({
            supplements
        });
    }
    render() {
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
                        <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ supplement.name } className="responsive-img supplement-img" />
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
                            this.state.dataChanged && (<a href="#!" onClick={ this.handleSaveButton } className="btn waves-effect right">Zapisz</a>)
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 xl6">
                        <p className="card-top-title">Informacje ogólne</p>
                        <div className="card-panel">
                            <div className="row general-info-form valign-wrapper">
                                <div className="col s12 xl6 center file-field input-field">
                                    { this.state.image ? (
                                            <img src={ this.state.image } alt="training" className="responsive-img profile-pic-img circle"/>
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
                                            <label htmlFor="username-field">Nazwa użytkownika</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="email-field" type="text" onChange={ this.handleInputChange } value={ this.state.email } />
                                            <label htmlFor="email-field">Email</label>
                                        </div>
                                        <div className="col s12 input-field">
                                            <i className="fas fa-venus-mars"></i>
                                            <select defaultValue="0" id="gender-select" className="select-field" onChange={ this.handleInputChange } >
                                                <option value="0" disabled>Wybierz</option>
                                                <option value="1">Mężczyzna</option>
                                                <option value="2">Kobieta</option>                                                
                                            </select>
                                            <label>Płeć</label>
                                        </div>
                                        <div className="col s12 input-field">
                                            <select defaultValue="0" id="training-type-select" className="select-field" onChange={ this.handleInputChange } >
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
                                            <label htmlFor="age-field">Wiek</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="weight-field" type="number" onChange={ this.handleInputChange } value={ this.state.weight } />
                                            <label htmlFor="weight-field">Waga (kilogramy)</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="height-field" type="number" onChange={ this.handleInputChange } value={ this.state.height } />
                                            <label htmlFor="height-field">Wzrost (centymetry)</label>
                                        </div>
                                        <div className="col s12 input-field">                                            
                                            <input id="training-duration-field" type="number" onChange={ this.handleInputChange } value={ this.state.trainingDuration } />
                                            <label htmlFor="training-duration-field">Staż treningowy (lata)</label>
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
            </div>
        )
    }    
}

export default EditData
