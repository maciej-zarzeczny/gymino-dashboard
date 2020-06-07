import React, { Component } from 'react'
import M from 'materialize-css';
import './add_workout.scss';
import Exercises from './exercises';
import AddedExercise from './added_exercise';
import { connect } from 'react-redux';
import { createWorkout } from '../../../redux/actions/workout_actions';
import FullPagePreloader from '../../layout/preloader/full_page_preloader';
import Alert from '../../layout/alert/alert'

class AddTraining extends Component {    
    state = {           
        exercises: [],
        keywords: [],
        image: null,           
        name: '',
        duration: '',
        description: '',
        difficulty: 0,
        isPremium: false,
    }
    componentDidMount() {
        var chips = document.querySelectorAll('.chips-placeholder');        
        var select = document.querySelectorAll('select');        
        M.FormSelect.init(select);
        M.Chips.init(chips, { 
            placeholder: 'Słowa kluczowe',
            secondaryPlaceholder: '+słowo kluczowe',
            limit: 3, 
            onChipAdd: () => this.onChipAdd(chips[0]),
            onChipDelete: () => this.onChipDelete(chips[0])
          });        
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
        const { exercises, keywords, image, name, duration, difficulty, description } = this.state;

        if (!this.props.user.verified) {
            alert ('Błąd: Aby móc dodawać treningi przejdź do zakładki edytuj dane i uzupełnij wszystkie pola')
        } else if (keywords.length === 0 || image === '' || name === '' || duration === '' || difficulty === 0 || description === '') {
            alert ('Błąd: Wszystkie pola muszą być wypełnione');
        } else if (exercises.length === 0) {
            alert('Błąd: Należy dodać minimum jedno ćwiczenie do treningu');
        } else if(isNaN(duration)) {
            alert('Błąd: Niepoprawna wartość czasu trwania treningu');
        } else if (duration <= 0) {
            alert ('Błąd: Czas trwania treningu musi być większy od zera');
        } else if (image === null) {
            alert ('Błąd: Dodaj zdjęcie treningu')
        } else {
            let error = false;            
            exercises.forEach(exercise => {
                if (exercise.rest === 0 || exercise.setRest === 0 || !exercise.rest || !exercise.setRest) {
                    error = true;                        
                }
            });

            if (!error) {                                
                this.props.createWorkout(this.state);
            } else {
                alert('Błąd: Uzupełnij dane dotyczącze serii i czasów odpoczynku we wszystkich ćwiczeniach');
            }
        }        
    }
    handleImageChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],         
            });
        }        
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
            case 'isPremium':
                console.log(e.target.value);
                this.setState({
                    isPremium: !this.state.isPremium
                })
                break;         

            default:                                  
                break;
        }
    }
    onChipAdd = (chips) => {
        var instance = M.Chips.getInstance(chips);
        let keywords = [...this.state.keywords, instance.chipsData[this.state.keywords.length].tag]

        this.setState({
            keywords
        })
    }
    onChipDelete = (chips) => {
        var instance = M.Chips.getInstance(chips);
        let keywords = [];
        for (let i = 0; i < instance.chipsData.length; i++) {
            const el = instance.chipsData[i];
            keywords.push(el.tag);
        }

        this.setState({
            keywords
        })
    }
    render() {        
        const { isLoading } = this.props;

        const addedExercisesList = this.state.exercises.length > 0 ? this.state.exercises.map((exercise) => {
            return (                  
                <AddedExercise key={ exercise.id } exercise={ exercise } removeExercise={ this.removeExercise }  updateSetsData={ this.updateSetsData }/>
            )
        }) : (
            <p>Brak dodanych ćwiczeń</p>
        );
        
        const preloader = isLoading && <FullPagePreloader /> 

        const alert = (this.props.user.verified !== undefined && !this.props.user.verified) && (
            <div className="row">
                <div className="col s12">
                    <Alert content="Aby móc dodawać treningi przejdź do zakładki edytuj dane i uzupełnij wszystkie pola" />
                </div>
            </div>
        )        

        return (            
            <div className="wrapper">                                                
                <div className="row valign-wrapper add-training-header">
                    <div className="col s6">                
                        <h4>Dodaj nowy trening</h4>
                    </div>
                    <div className="col s6">
                        <button onClick={ this.submitTraining } className="btn waves-effect right">Opublikuj trening</button>
                    </div>
                </div>
                { alert }
                <div className="row">
                    <div className="col s12">
                        <p className="card-top-title">Informacje ogólne</p>
                        <form className="card-panel">
                            <div className="row general-info-form valign-wrapper">
                                <div className="col s12 xl3 center file-field input-field">
                                    { this.state.image ? (
                                            <img src={ URL.createObjectURL(this.state.image) } alt="training" className="responsive-img training-img circle"/>
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
                                            <span className="helper-text red-text">* Po wpisaniu słowa kluczowego naciśnij enter w celu potwierdzenia (max 3)</span>
                                        </div>                                        
                                        <div className="col s12 input-field">
                                            <textarea id="training-description" className="materialize-textarea" onChange={ this.handleInputChange } value={ this.state.description }></textarea>
                                            <label htmlFor="training-description">Opis treningu</label>
                                        </div>
                                        <div className="col s12">
                                            <label>
                                                <input id="isPremium" type="checkbox" className="filled-in" onChange={ this.handleInputChange } />
                                                <span>Trening dla użytkowników premium</span>
                                            </label>
                                        </div>
                                    </div>                                        
                                </div>
                                
                            </div>                           
                        </form>
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
                { preloader } 
            </div>                           
        )
    }    
}

function mapStateToProps(state) {    
    return {
        isLoading: state.workout.isLoading,
        user: state.firebase.profile
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        createWorkout: (workout) => dispatch(createWorkout(workout, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTraining)
