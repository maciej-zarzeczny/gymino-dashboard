import React, { Component } from 'react'
import './all_workouts.scss';
import Preloader from '../../layout/preloader/preloader'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { getWorkouts, deleteWorkout } from '../../../redux/actions/workout_actions'
import moment from 'moment';

class AllTrainings extends Component {
    componentDidMount() {
        this.props.getWorkouts()     
        moment.locale('pl')   
    }    
    render() {
        const { workouts } = this.props;           
        const workoutsList = workouts ? workouts.length > 0 ? workouts.map((workout) => {
            return (
                <div className="col s12 l4 xl3" key={ workout.id }>
                    <div className="card">
                        <div className="card-image ">
                            <img src="https://firebasestorage.googleapis.com/v0/b/sqilly.appspot.com/o/kura_1.jpg?alt=media&token=bb051e32-c25a-4a77-aa2b-e2bca6a8c5aa" alt={ workout.name } />
                        </div>
                        <div className="card-content">
                            <p className="training-card-name truncate">{ workout.name }</p>
                            <p className="training-card-subtitle valign-wrapper"><i className="material-icons taining-card-icon">today</i>{ moment(workout.createdAt.toDate()).format('D-MM-YYYY') }</p>
                            <p className="training-card-subtitle valign-wrapper"><i className="material-icons taining-card-icon">people</i>{ workout.amount }</p>
                        </div>
                        <div className="card-action">
                            <button onClick={ () => this.props.deleteWorkout(workout.id) } className="btn-small waves-effect red darken-1"><i className="material-icons left">delete</i>Usuń</button>                            
                        </div>
                    </div>
                </div>
            )
        }) : (
            <div>
                <p>Brak dodanych treningów</p>
                <NavLink to="/add_workout">
                    <button className="btn waves-effect btn-small red darken-1">Dodaj pierwszy trening</button>
                </NavLink>
            </div>
        ) : (            
            <Preloader active={ true } />
        );
        return (
            <div className="all-trainings wrapper">
                <h4>Wszystkie treningi</h4>
                <div className="row">
                    { workoutsList }
                </div>
            </div>            
        )
    }    
}

function mapStateToProps(state) {
    return {
        workouts: state.workout.workouts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getWorkouts: () => dispatch(getWorkouts()),
        deleteWorkout: (id) => dispatch(deleteWorkout(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTrainings)