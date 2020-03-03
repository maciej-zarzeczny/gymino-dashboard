import React, { Component } from 'react'
import M from 'materialize-css';
import './add_training.scss';
import Exercises from './exercises';
import AddedExercise from './added_exercise';

class AddTraining extends Component {    
    state = {           
        exercises: [],
        keywords: [],
        image: null,
        name: '',
        duration: '',
        description: '',
        difficulty: 0,
    }
    componentDidMount() {
        var chips = document.querySelectorAll('.chips-placeholder');
        var select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        M.Chips.init(chips, { placeholder: 'Słowa kluczowe', secondaryPlaceholder: '+słowo kluczowe', limit: 3 });
    }
    addExercise = (exercise) => {
        let exercises = [...this.state.exercises, exercise];
        this.setState({
            exercises
        });
    }
    updateSetsData = (id, data) => {
        let exercises = [...this.state.exercises];        
        for (let i = 0; i < exercises.length; i++) {
            const ex = exercises[i];
            if (ex.id === id) {
                ex.rest = data.rest;
                ex.setRest = data.setRest;
                ex.sets = data.sets;
            }            
        }

        this.setState({
            exercises
        });         
    }
    removeExercise = (id) => {
        let exercises = this.state.exercises.filter((exercise) => {
            return exercise.id !== id;
        });
        this.setState({
            exercises
        });
    }
    submitTraining = () => {
        var chips = document.querySelectorAll('.chips');
        var instance = M.Chips.getInstance(chips[0]);
        var keywords = [];
        for (let i = 0; i < instance.chipsData.length; i++) {
            const el = instance.chipsData[i];
            keywords.push(el.tag);
        }
        
        this.setState({
            keywords
        });

        console.log(this.state);
    }
    handleImageChange = (e) => {
        this.setState({
            image:  URL.createObjectURL(e.target.files[0])
        });
    }
    handleInputChange = (e) => {
        switch (e.target.id) {
            case 'training-name':
                this.setState({
                    name: e.target.value
                });
                break;
            case 'duration-time':
                this.setState({
                    duration: e.target.value === '' ? '' : parseInt(e.target.value)
                });
                break;
            case 'training-description':
                this.setState({
                    description: e.target.value
                });
                break;
            case 'difficulty-picker':
                this.setState({
                    difficulty: parseInt(e.target.value)
                });
                break;

            default:                                  
                break;
        }
    }
    render() {        
        const addedExercisesList = this.state.exercises.length > 0 ? this.state.exercises.map((exercise) => {
            return (                  
                <AddedExercise key={ exercise.id } exercise={ exercise } removeExercise={ this.removeExercise }  updateSetsData={ this.updateSetsData }/>
            )
        }) : (
            <p>Brak dodanych ćwiczeń</p>
        );
        return (
            <div className="wrapper">
                <div className="row valign-wrapper add-training-header">
                    <div className="col s6">                
                        <h4>Dodaj nowy trening</h4>
                    </div>
                    <div className="col s6">
                        <a href="#!" onClick={ this.submitTraining } className="btn waves-effect right">Opublikuj trening</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="card-top-title">Informacje ogólne</p>
                        <div className="card-panel">
                            <div className="row general-info-form valign-wrapper">
                                <div className="col s12 xl3 center file-field input-field">
                                    { this.state.image ? (
                                            <img src={ this.state.image } alt="training" className="responsive-img training-img circle"/>
                                        ) : 
                                        (
                                            <i className="material-icons training-image-placeholder">add_a_photo</i>
                                        ) }
                                    <input type="file" onChange={ this.handleImageChange } />
                                </div>
                                <div className="col s12 xl9">
                                    <div className="row">
                                        <div className="col s12 input-field">
                                            <input id="training-name" type="text" data-length="25" onChange={ this.handleInputChange } value={ this.state.name } />
                                            <label htmlFor="training-name">Nazwa treningu</label>
                                        </div>
                                        <div className="col s12 xl6 input-field">
                                            <select defaultValue="0" id="difficulty-picker" onChange={ this.handleInputChange }>
                                                <option value="0" disabled>Wybierz</option>
                                                <option value="1">Początkujący</option>
                                                <option value="2">Średniozaawansowany</option>
                                                <option value="3">Zaawansowany</option>
                                            </select>
                                            <label>Poziom zaawansowania</label>
                                        </div>
                                        <div className="col s12 xl6 input-field">
                                            <input id="duration-time" type="number" onChange={ this.handleInputChange } value={ this.state.duration }/>
                                            <label htmlFor="duration-time">Czas trwania (w minutach)</label>
                                        </div>
                                        <div className="col s12 input-field keywords-input-field">
                                            <div className="chips chips-placeholder chips-input-field"></div>
                                        </div>
                                        <div className="col s12 input-field">
                                            <textarea id="training-description" className="materialize-textarea" onChange={ this.handleInputChange } value={ this.state.description }></textarea>
                                            <label htmlFor="training-description">Opis treningu</label>
                                        </div>
                                    </div>                                        
                                </div>
                                
                            </div>                           
                        </div>
                    </div>
                </div>  
                <div className="row">
                    <div className="col s12 xl6">
                        <Exercises addExercise={ this.addExercise } />
                    </div>
                    <div className="col s12 xl6">
                        <p className="card-top-title">Dodane ćwiczenia</p>
                        { addedExercisesList }
                    </div>
                </div>    
            </div>                           
        )
    }    
}

export default AddTraining
