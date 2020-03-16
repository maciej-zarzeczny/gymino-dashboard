import React from 'react'
import M from 'materialize-css'
import { connect } from 'react-redux'
import { addExercise } from '../../../redux/actions/exercise_actions'
import FullPagePreloader from '../../layout/preloader/full_page_preloader'
import './add_exercise.scss'

class AddExercise extends React.Component {    
    state = {
        name: '',
        keywords: [],
        description: '',
        bulletPoints: [''],
        image: null,
        showSuccessAlert: false,
        showErrorAlert: false,        
    }
    componentDidMount() {
        this.chips = document.querySelector('.chips');
        M.Chips.init(this.chips, { 
            placeholder: 'Partie mięśniowe',
            secondaryPlaceholder: '+partia mięśniowa',
            limit: 3, 
            onChipAdd: () => this.onChipAdd(),
            onChipDelete: () => this.onChipDelete()
          });        
    }    
    componentDidUpdate(prevProps) {
        if (prevProps.exerciseAddedState !== this.props.exerciseAddedState) {
            switch (this.props.exerciseAddedState) {
                case 'SUCCESS':                                                      
                    var instance = M.Chips.getInstance(this.chips)
                    var length = instance.chipsData.length
                    for (let i = 0; i < length; i++) {                        
                        instance.deleteChip(0)
                    }
                    this.setState({
                        name: '',
                        keywords: [],
                        description: '',
                        bulletPoints: [''],
                        image: null,
                        showSuccessAlert: true
                    })
                    break;

                case 'ERROR':
                    this.setState({
                        showErrorAlert: true
                    })
                    break;

                default:
                    break;
            }
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, keywords, description, bulletPoints, image } = this.state

        if (name === '' || description === '') {
            alert('Błąd: Wszystkie pola muszą być wypełnione')
        } else if (keywords.length === 0) {
            alert ('Błąd: Należy dodać minimum jedną partię mieśniową')
        } else if (image === null) {
            alert ('Błąd: Należy dodać zdjęcie przedstawiające ćwiczenie')
        } 
        else {
            this.props.addExercise({
                name,
                keywords,
                description,
                bulletPoints,
                image
            })
        }
    }
    handleInputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onChipAdd = () => {
        var instance = M.Chips.getInstance(this.chips);
        let keywords = [...this.state.keywords, instance.chipsData[this.state.keywords.length].tag]

        this.setState({
            keywords
        })
    }
    onChipDelete = () => {
        var instance = M.Chips.getInstance(this.chips);
        let keywords = [];
        for (let i = 0; i < instance.chipsData.length; i++) {
            const el = instance.chipsData[i];
            keywords.push(el.tag);
        }

        this.setState({
            keywords
        })
    }
    bulletChange = (e, index) => {
        let bulletPoints = [...this.state.bulletPoints];
        let bulletPoint = {...bulletPoints[index]};
        bulletPoint = e.target.value;

        bulletPoints[index] = bulletPoint;
        this.setState({
            bulletPoints
        });
    }
    addBullet = () => {
        let bulletPoints = [...this.state.bulletPoints, '']        
        this.setState({
            bulletPoints
        })
    }
    removeBullet = (index) => {
        let bulletPoints = [...this.state.bulletPoints];
        bulletPoints.splice(index, 1);

        this.setState({
            bulletPoints
        });        
    }
    handleImageChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
    }
    render() {      
        if (this.state.showSuccessAlert || this.state.showErrorAlert) {
            setTimeout(() => {
                this.setState({
                    showSuccessAlert: false,
                    showErrorAlert: false
                })
            }, 2000)
        }
        const preloader = this.props.isLoading && <FullPagePreloader />
        const successAlert = this.state.showSuccessAlert && (
            <div className="row">
                <div className="col s12">
                    <p className="green lighten-3 alert">Pomyślnie dodano ćwiczenie</p>
                </div>
            </div>
        )
        const errorAlert = this.state.showErrorAlert && (
            <div className="row">
                <div className="col s12">
                    <p className="red lighten-3 alert">Podczas dodawania ćwiczenia wystąpił błąd. Spróbuj ponownie</p>
                </div>
            </div>
        )
        const bulletPointsList = this.state.bulletPoints.map((bulletPoint, index) => {
            return (
                <div className="row valign-wrapper" key={ index }>
                    <div className="col s1 center">
                        <i className="material-icons bullet-point-icon">star_outlined</i>
                    </div>
                    <div className="col s10 input-field">
                        <input id={ "bullet-" + index } type="text" onChange={ (e) => this.bulletChange(e, index) } value={ bulletPoint } />
                    </div>
                    <div className="col s1 center">
                        <a href="#!" onClick={ () => this.removeBullet(index) }><i className="material-icons red-text darken-1">remove_circle_outline</i></a>
                    </div>
                </div>
            )
        })
        return (
            <div className="wrapper">            
                <h4>Dodaj nowe ćwiczenie</h4>
                { successAlert }
                { errorAlert }
                <div className="row">
                    <div className="col s12">
                        <p className="card-top-title">Informacje o ćwiczeniu</p>
                        <form className="card-panel" onSubmit={ this.handleSubmit }>
                            <div className="row add-exercise-form valign-wrapper">
                                <div className="col s12 xl4 center file-field input-field">
                                    { this.state.image ? (
                                            <img src={ URL.createObjectURL(this.state.image) } alt="exercise" className="responsive-img exercise-img circle"/>
                                        ) : 
                                        (
                                            <i className="material-icons exercise-image-placeholder">add_a_photo</i>
                                        ) }
                                    <input type="file" onChange={ this.handleImageChange } />
                                </div>                                
                                <div className="col s12 xl8">
                                    <div className="row">
                                        <div className="col input-field s12">
                                            <input id="name" type="text" onChange={ this.handleInputChange } value={ this.state.name } />
                                            <label htmlFor="name">Nazwa</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 input-field keywords-input-field">
                                            <div className="chips chips-placeholder chips-input-field"></div>
                                            <span className="helper-text red-text">* Po wpisaniu partii mięśniowej naciśnij enter w celu potwierdzenia (max 3)</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 input-field">
                                            <textarea id="description" className="materialize-textarea" onChange={ this.handleInputChange } value={ this.state.description }></textarea>
                                            <label htmlFor="description">Opis ćwiczenia</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12">
                                            <p>Na co zwrócić uwagę ? (opcjonalne)</p>
                                        </div>                                
                                    </div>
                                    { bulletPointsList }
                                    <div className="row">
                                        <div className="col s1 center">
                                            <a href="#!" onClick={ () => this.addBullet() }><i className="material-icons green-text darken-1">add_circle_outline</i></a>
                                        </div>                                
                                    </div>                            
                                    <div className="row no-bottom-margin">
                                        <div className="col s12">
                                            <button type="submit" className="btn waves-effect-red-darken-1 right">Dodaj</button>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </form>
                    </div>
                </div>
                { preloader }
            </div>
        )
    }    
}

function mapStateToProps(state) {
    return {
        isLoading: state.exercise.isLoading,
        exerciseAddedState: state.exercise.exerciseAddedState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addExercise: (exercise) => dispatch(addExercise(exercise))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise)
