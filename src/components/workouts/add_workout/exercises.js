import React, { Component } from 'react';
import { fetchExercises, fetchMoreExercises } from '../../../redux/actions/exercise_actions'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Preloader from '../../layout/preloader/preloader'

class Exercises extends Component {
    componentDidMount() {
        if (!this.props.exercisesLoaded) {
            this.props.fetchExercises()
        }

        this.fetchStarted = false;
        var object = document.querySelector('.exercises-card');
        object.addEventListener('scroll', () => {
            if(object.offsetHeight + object.scrollTop === object.scrollHeight)
            {                
                if (!this.props.allExercisesLoaded && !this.fetchStarted) {
                    this.fetchStarted = true;
                    this.props.fetchMoreExercises();                    
                }
            }
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.exercises.length !== this.props.exercises.length) {
            this.fetchStarted = false;
        }        
    }
    render() {
        const { addExercise } = this.props;
        const exercisesList = !this.props.isLoading ? this.props.exercises.length > 0 ? this.props.exercises.map((exercise) => {
            return (
                <div key={ exercise.id }>
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <img src={ exercise.image } alt={ exercise.name } className="responsive-img exercise-list-image" />
                        </div>
                        <div className="col s7">
                            <p className="exercise-name truncate">{ exercise.name }</p>
                        </div>
                        <div className="col s3">
                            <a href="#!" onClick={ () => addExercise({ id: exercise.id, name: exercise.name, image: exercise.image }) } className="btn waves-effect blue darken-1 right">Dodaj</a>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
            );
        }) : (
            <div>
                <p>Brak dodanych ćwiczeń. Aby stworzyć trening należy najpierw dodać ćwiczenia</p>
                <NavLink to="/add-exercise"><button className="btn red darken-1 waves-effect">Dodaj ćwiczenia</button></NavLink>
            </div>
        ) : (
            <Preloader active={ true } />
        )  
        const moreLoading = this.props.moreLoading && <Preloader active={ true } /> 
        return (
            <div>
                <p className="card-top-title">Baza ćwiczeń</p>
                <div className="exercises-card z-depth-1">
                    {/* <div className="exercises-card-header row valign-wrapper">                                
                        <div className="col s12 input-field">
                            <select defaultValue="0">
                                <option value="0" disabled>Partia mięśniowa</option>
                                <option value="1">Brzuch</option>
                                <option value="2">Biceps</option>
                                <option value="3">Triceps</option>
                                <option value="4">Klatka</option>
                                <option value="5">Plecy</option>
                                <option value="6">Nogi</option>
                                <option value="7">Barki</option>
                                <option value="8">Całe ciało</option>
                            </select>                                    
                        </div>                        
                    </div> */}
                    <div className="exercises-card-content">
                        { exercisesList }
                        { moreLoading }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        exercises: state.exercise.exercises,
        exercisesLoaded: state.exercise.exercisesLoaded,
        isLoading: state.exercise.isLoading,
        moreLoading: state.exercise.moreLoading,
        allExercisesLoaded: state.exercise.allExercisesLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchExercises: () => dispatch(fetchExercises()),
        fetchMoreExercises: () => dispatch(fetchMoreExercises())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)