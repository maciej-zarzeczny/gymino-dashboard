import React, { Component } from 'react'
import Preloader from '../../layout/preloader/preloader'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css'
import './all_exercises.scss'

import { connect } from 'react-redux'
import { fetchExercises, fetchMoreExercises, deleteExercise } from '../../../redux/actions/exercise_actions'

class AllExercises extends Component {
    state = {
        id: '',
        imageName: ''
    }
    componentDidMount() {
        var modal = document.querySelector('.modal');
        M.Modal.init(modal);

        if (!this.props.exercisesLoaded) {            
            this.props.fetchExercises()
        }
    }    
    render() {          
        const { exercises, isLoading } = this.props        
        const exercisesList = !isLoading ? exercises.length > 0 ? exercises.map((exercise) => {
            const keywordsList = exercise.keywords.map((keyword, index) => {
                return (
                    <div className="col auto" key={ index }>
                        <div className="keyword">{ keyword }</div>
                    </div>                    
                )
            })
            const bulletPointsList = exercise.bulletPoints[0] !== '' && exercise.bulletPoints.map((bulletPoint, index) => {
                return (
                    <li key={ index } className="valign-wrapper"><i className="material-icons">star_outlined</i>{ bulletPoint }</li>
                )
            })
            return (
                <div className="col s12 l6 xl4" key={ exercise.id }>
                    <div className="card sticky-action">
                        <div className="card-image waves-effect waves-light waves-block">
                            <img src={ exercise.image } alt="exercise" className="exercise-image activator" />
                        </div>
                        <div className="card-content row">
                            <div className="col s11">
                                <span className="training-card-name card-title activator">{ exercise.name }</span>
                            </div>
                            <div className="col s1">
                                <i className="material-icons right activator">more_vert</i>
                            </div>
                        </div>
                        <div className="card-action">
                            <button onClick={ () => this.setState({ id: exercise.id, imageName: exercise.imageName }) } data-target="confirmation-modal" className="btn-small waves-effect red darken-1 modal-trigger"><i className="material-icons left">delete</i>Usuń</button>
                        </div>
                        <div className="card-reveal">
                            <span className="training-card-name card-title truncate activator">{ exercise.name }<i className="material-icons right">close</i></span>
                            <div className="row">
                                { keywordsList }
                            </div>                            
                            <p>{ exercise.description }</p>
                            <ul>{ bulletPointsList }</ul>
                        </div>
                    </div>
                </div>
            )
        }) : 
        (
            <div>
                <p>Brak dodanych ćwiczeń</p>
                <NavLink to="/add-exercise">
                    <button className="btn waves-effect btn-small red darken-1">Dodaj pierwsze ćwiczenie</button>
                </NavLink>
            </div>
        ) : 
        (
            <Preloader active={true} />
        )
        const loadMore = this.props.moreLoading ? (
            <Preloader active={ true } />
        ) : (
            <a href="#!" onClick={ () => this.props.fetchMoreExercises() } className="waves-effect waves-red red-text darken-1 btn-flat">Załaduj więcej</a>
        )
        return (
            <div className="all-trainings wrapper">
                <h4>Wszystkie ćwiczenia</h4>
                <div className="row">
                    { exercisesList }
                </div>
                { !this.props.allExercisesLoaded && !this.props.isLoading && loadMore }
                <div id="confirmation-modal" className="modal">
                    <div className="modal-content">
                        <h4>Usuwanie ćwiczenia</h4>
                        <p>Tej czynności nie można cofnąć. Czy na pewno chcesz usunąć wybrane ćwiczenie?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat">Nie</button>
                        <button onClick={ () => this.props.deleteExercise(this.state.id, this.state.imageName) } className="modal-close waves-effect waves-green btn-flat">Tak</button>
                    </div>
                </div>
            </div>            
        )
    }    
}

function mapStateToProps(state) {        
    return{ 
        exercises: state.exercise.exercises,
        isLoading: state.exercise.isLoading,
        moreLoading: state.exercise.moreLoading,
        exercisesLoaded: state.exercise.exercisesLoaded,
        allExercisesLoaded: state.exercise.allExercisesLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchExercises: () => dispatch(fetchExercises()),
        fetchMoreExercises: () => dispatch(fetchMoreExercises()),
        deleteExercise: (id, imageName) => dispatch(deleteExercise(id, imageName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllExercises)