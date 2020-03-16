import React, { Component } from 'react';
import M from 'materialize-css';

class NewSupplementModal extends Component {
    constructor(props) {
        super(props);

        this.initialState = this.state;
    }
    state = {
        name: '',
        form: 1,
        amount: '',
        unit: 3,
        portionsPerDay: '',
    }    
    handleInputChange = (e) => {
        switch (e.target.id) {
            case 'supplement-name-field':
                this.setState({
                    name: e.target.value
                })
                break;
            case 'supplement-form-select':
                this.setState({
                    form: parseInt(e.target.value)
                })
                break;
            case 'supplement-amount-field':
                this.setState({
                    amount: e.target.value === '' ? '' : parseInt(e.target.value)
                })
                break;
            case 'supplement-unit-select':
                this.setState({
                    unit: parseInt(e.target.value)
                })
                break;
            case 'supplement-portions-field':
                this.setState({
                    portionsPerDay: e.target.value === '' ? '' : parseInt(e.target.value)
                })
                break;

            default:
                break;
        }
    }
    handleSubmit = () => {
        const { name, form, amount, portionsPerDay } = this.state;
        if (name === '' || form === 0 || amount === '' || portionsPerDay === '') {
            alert('Błąd: Wszystkie pola muszą być wypełnione');            
        } else if (amount <= 0 || portionsPerDay <= 0) {
            alert('Błąd: wartości numeryczne muszą być większe od zera');
        } else {
            var modal = document.querySelectorAll('.modal');
            var instance = M.Modal.getInstance(modal[0]);
            
            this.props.addSupplement(this.state);
            instance.close();
            this.setState(this.initialState);
        }        
    }
    render() {        
        return (
            <div id="new-supplement-modal" className="modal">
                <div className="modal-content">
                    <p className="card-top-title">Dodaj nowy suplement</p>
                    <div className="row no-bottom-margin">
                        <div className="col s12 input-field">
                            <input id="supplement-name-field" type="text" onChange={ this.handleInputChange } value={ this.state.name } />
                            <label htmlFor="supplement-name-field">Nazwa</label>
                        </div>
                        <div className="col s12 input-field">
                            <select defaultValue="1" id="supplement-form-select" className="select-field" onChange={ this.handleInputChange }>                                
                                <option value="1">Proszek</option>
                                <option value="2">Tabletki</option>                                    
                            </select>
                            <label>Forma suplementu</label>
                        </div>                
                        <div className="col s10 l5 input-field">
                            <input id="supplement-amount-field" type="number" onChange={ this.handleInputChange } value={ this.state.amount } />
                            <label htmlFor="supplement-amount-field">Ilość w porcji</label>
                        </div>
                        <div className="col s2 l2 input-field">
                            <select defaultValue="3" id="supplement-unit-select" className="select-field" onChange={ this.handleInputChange }>
                                <option value="1">ug</option>
                                <option value="2">mg</option>
                                <option value="3">g</option>                                    
                            </select>
                            <label>Jednostka</label>
                        </div>                
                        <div className="col s12 l5 input-field">
                            <input id="supplement-portions-field" type="number" onChange={ this.handleInputChange } value={ this.state.portionsPerDay } />
                            <label htmlFor="supplement-portions-field">Ilość porcji w ciągu dnia</label>
                        </div>                            
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" onClick={ this.handleSubmit } className="waves-effect waves-green green-text darken-1 btn-flat">Dodaj</a>
                </div>
            </div>        
        )
    }    
}

export default NewSupplementModal
